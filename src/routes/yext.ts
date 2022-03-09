import axios from "axios"
import { Request, Response } from "express"
import YextErrorDecoder from "../utils/YextErrorDecoder"
import CreateOrUpdateLocation from "../utils/CreateOrUpdateLocation"
const YEXT_BASE_URL = "https://api.yext.com/v2/accounts/me/"

module.exports = {
  create: async (req: Request, res: Response) => {
    const url = `${YEXT_BASE_URL}entities?entityType=location&api_key=061b421ca1852bddfcf96e4138f49da4&v=20220202`

    req.body.address.postalCode = req.body.address.postalCode.toString()
    const {c_mapTile} = req.body
    if (c_mapTile == ''){
      delete req.body.c_mapTile
    }
    delete req.body.geocodedCoordinate
    try {
      const result = await axios.post(url, req.body)

      const newLocation = await CreateOrUpdateLocation(result.data.response, req.params.id)

      res.json({message: `${req.body.c_locationName} created successfully`, redirect:`/locations/${req.body.meta.id}`})
    } catch (e) {
      res.json(e.response.data.meta.errors[0])
    }
  },
  update: async (req: Request, res: Response) => {
    console.log('update')
    const url = `${YEXT_BASE_URL}entities/${req.params.id}?api_key=061b421ca1852bddfcf96e4138f49da4&v=20220202`
    try {
      const result = await axios.put(url, req.body)
      await CreateOrUpdateLocation(result.data.response, req.params.id)
      res.json({ result })
    } catch (e) {
      res.json(e)
    }
  },

  sync: async (req: Request, res: Response) => {
    let entitySearch
    if (req.params.id == "all") {
      entitySearch = `entities`
    } else {
      entitySearch = `entities/${req.params.id}`
    }

    const { data: yextLocation } = await axios.get(`${YEXT_BASE_URL}${entitySearch}?api_key=061b421ca1852bddfcf96e4138f49da4&v=20220202`)

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
