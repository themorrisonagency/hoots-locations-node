import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import { Location } from "../entities/Location"
import { LocationInput } from "../utils/LocationInput"

@ObjectType()
class LocationResponse {
  @Field(() => [Location])
  location?: Location[]
}

@Resolver(Location)
export class LocationResolver {


  @Query(() => [Location], {nullable: true})
  async locations(){

    const locations = await getConnection()
    .query(`
    SELECT p.*
    FROM location p
    WHERE name = 'Hoots Wings'`)

    for (const location of locations) {
      Object.keys(location).forEach(key => {
        if (location[key] === null) {
          location[key] = '';
        }
      });
    }


    return locations
  }

  @Query(() => Location)
  async location(
    @Arg("yextId") yextId: string
  ): Promise<Location[]> {
    try {
      const result = await getConnection()
        .getRepository(Location)
        .createQueryBuilder("location")
        .where('"yextId" = :id', {id: yextId})
        .getOne()
        return result

    } catch (err) {
      return err
    }


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
