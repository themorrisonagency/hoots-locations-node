import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import { Location } from "../entities/Location"
import { LocationInput } from "../utils/LocationInput"

@ObjectType()
class LocationResponse {
  @Field(() => [Location], { nullable: true })
  location?: Location[]
}

@Resolver(Location)
export class LocationResolver {


  @Query(() => [Location], {nullable: true})
  async locations(){
    return await Location.find({
    })
  }


  @Mutation(() => LocationResponse)
  async addLocation(@Arg("options") options: LocationInput): Promise<LocationResponse> {
    let location
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Location)
        .values({
          ...options,
        })
        .returning("*")
        .execute()
      location = result.raw[0]
    } catch (err) {
      return err
    }

    return { location }
  }
}
