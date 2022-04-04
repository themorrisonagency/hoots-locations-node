import axios from "axios"
import { Request, Response } from "express"
import CreateOrUpdateLocation from "../utils/CreateOrUpdateLocation"
import {Location} from '../entities/Location'
import 'dotenv-safe/config'
const YEXT_API_KEY = process.env.YEXT_API_KEY

const YEXT_BASE_URL = "https://api.yext.com/v2/accounts/me/"

module.exports = {
  create: async (req: Request, res: Response) => {
    const url = `${YEXT_BASE_URL}entities?entityType=location&api_key=${YEXT_API_KEY}&v=20220202`

    req.body.address.postalCode = req.body.address.postalCode.toString()

    delete req.body.geocodedCoordinate
    try {
      const result = await axios.post(url, req.body)

      await CreateOrUpdateLocation(result.data.response, req.params.id)

      res.json({message: `${req.body.c_locationName} created successfully`, redirect:`/admin/${req.body.meta.id}`})
    } catch (e) {
      res.json(e.response.data.meta.errors[0])
    }
  },
  update: async (req: Request, res: Response) => {
    const url = `${YEXT_BASE_URL}entities/${req.params.id}?api_key=061b421ca1852bddfcf96e4138f49da4&v=20220202`
    try {
      delete req.body.isClosed
      if (req.body.geocodedCoordinate && req.body.geocodedCoordinate.latitude && typeof req.body.geocodedCoordinate.latitude == "string"){
        let geo = {
          latitude: parseFloat(req.body.geocodedCoordinate.latitude),
          longitude: parseFloat(req.body.geocodedCoordinate.longitude)
        }
        
        req.body.geocodedCoordinate = geo

      }

      // When we add a location, we start with an hours object that has isClosed set to true for all days.
      // If hours are added, we needed to remove the isClosed flag.

      const result = await axios.put(url, req.body)
      await CreateOrUpdateLocation(result.data.response, req.params.id)
      res.json({message: 'Location updated successfully', location: result.data.response })
    } catch (e) {
      console.error('error', e)
      res.json(e.response.data.meta.errors[0])
    }
  },
  delete: async (req: Request, res: Response) => {
    console.log('delete')
    const url = `${YEXT_BASE_URL}entities/${req.params.id}?api_key=061b421ca1852bddfcf96e4138f49da4&v=20220202`
    try {
      const success = await Location.delete({yextId: req.params.id})

      await axios.delete(url)
      res.json({success})
    } catch (e) {
      console.error(e.response)
      res.json(e.response.data.meta.errors[0])
    }
  },

  sync: async (req: Request, res: Response) => {
    let entitySearch
    if (req.params.id == "all") {
      entitySearch = `entities`
    } else {
      entitySearch = `entities/${req.params.id}`
    }

    const filter = {
      "name": {
        "$eq":"Hoots Wings" 
      }
    }
    const { data: yextLocation } = await axios.get(`${YEXT_BASE_URL}${entitySearch}?api_key=${YEXT_API_KEY}&v=20220202&filter=${encodeURIComponent(JSON.stringify(filter))}&limit=50`)

    const yextResponse = yextLocation.response

    if (req.params.id == "all") {
      for (const entity of yextResponse.entities) {
        await CreateOrUpdateLocation(entity, entity.meta.id)
      }
    } else {
      await CreateOrUpdateLocation(yextResponse, yextResponse.meta.id)
    }
    res.json(yextResponse)
    res.end()
    try {
    } catch (e) {
      console.log("e", e)
    }
  },
}
