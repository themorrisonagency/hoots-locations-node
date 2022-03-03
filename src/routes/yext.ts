import axios from "axios"
import { Request, Response } from "express"
import CreateOrUpdateLocation from "../utils/CreateOrUpdateLocation"

module.exports = {
  update: async (req: Request, res: Response) => {
    const url = `https://api.yext.com/v2/accounts/me/entities/${req.params.id}?api_key=061b421ca1852bddfcf96e4138f49da4&v=20220202`
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

    const { data: yextLocation } = await axios.get(`https://api.yext.com/v2/accounts/me/${entitySearch}?api_key=061b421ca1852bddfcf96e4138f49da4&v=20220202`)

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
