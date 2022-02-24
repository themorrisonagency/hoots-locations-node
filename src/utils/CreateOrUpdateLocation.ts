import { getConnection, getManager } from "typeorm";
import {Location} from "../entities/Location"

export default async function CreateOrUpdateLocation(obj: any, id: string){

    let exists = await Location.find({
        where: {yextId: id},
        select: ["id"]
    })
    console.log('exists', exists[0])

    try {
        if (!exists[0]){
            console.log('obj', obj)
            obj.yextId = obj.meta.id
            await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Location)
            .values({
              ...obj,
            })
            .execute();
          } else {
            //   let updateLocation = [...obj]
            const locationRepo = getManager().getRepository(Location)
            obj.yextId = obj.meta.id

            // Clear out any fields that aren't set in yext
            let fields = ["address", "description", "hours", "name", "c_cateringURL", "c_infoBanner", "c_locationHighlights","c_locationName","c_locationShortName","c_locationSlug","c_mapTile","c_mapUrl","c_oloID", "c_promoUrl", "c_shortDescription", "geocodedCoordinate", "mainPhone", "orderUrl"  ]

            for (var i = 0; i < fields.length; i++){
                let key = fields[i]
                obj[key] = obj[key] || ""
                console.log('obj', obj[key])
            }

            await locationRepo.update({yextId: id}, obj)

            //   await getConnection()
            //   .createQueryBuilder()
            //   .update(Location)
            //   .set({

            //   })
            //   .where("yextId = :id", { id })
      
      
          }
    } catch(e){
        console.log('err', e)
    }

    //   let user
    //   const result = await getConnection()
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Location)
    //   .values({
    //     ...obj,
    //     yextId: obj.meta.id
    //   })
    //   .orIgnore()
    //   .returning("*")
    //   .execute();
    // user = result.raw[0];
   
}