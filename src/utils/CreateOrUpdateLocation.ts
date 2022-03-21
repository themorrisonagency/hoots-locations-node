import { getConnection, getManager } from "typeorm"
import { Location } from "../entities/Location"

export default async function CreateOrUpdateLocation(obj: any, id: string) {
  let exists = await Location.find({
    where: { yextId: id },
    select: ["id"],
  })

  try {
    if (!exists[0]) {
      obj.yextId = obj.meta.id
      if (obj.c_locationSlug == "" || obj.c_locationSlug == null){
        obj.c_locationSlug = id
      }
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Location)
        .values({
          ...obj,
        })
        .execute()
        return result.raw[0].id
    } else {
      const locationRepo = getManager().getRepository(Location)
      obj.yextId = obj.meta.id

      // Clear out any fields that aren't set in yext
      let fields = [
        "address",
        "description",
        "hours",
        "name",
        "c_cateringURL",
        "c_infoBanner",
        "c_locationHighlights",
        "c_locationName",
        "c_locationShortName",
        "c_locationSlug",
        "c_mapTile",
        "c_mapUrl",
        "c_oloID",
        "c_promoUrl",
        "c_shortDescription",
        "geocodedCoordinate",
        "mainPhone",
        "orderUrl",
      ]

      for (var i = 0; i < fields.length; i++) {
        let key = fields[i]
        obj[key] = obj[key] || ""
      }

      await locationRepo.update({ yextId: id }, obj)
      return await locationRepo.findOne({where: {yextId: id}})

    }
  } catch (e) {
    console.log("err", e)
  }


}
