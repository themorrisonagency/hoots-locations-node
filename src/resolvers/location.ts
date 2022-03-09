import { Arg, Field, FieldResolver, InputType, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql"
import { getConnection } from "typeorm"
import { Location } from "../entities/Location"
import {Convert24HourTo12Hour} from '../utils/timeConversion'
import { LocationInput } from "../utils/LocationInput"
import ShowOpenHours from "../utils/ShowOpenHours"

@InputType()
class UpdateVisibleInput {
  @Field()
  visible: boolean

  @Field()
  yextId: string
}

@InputType()
class UpdateComingSoonInput {
  @Field()
  comingSoon: boolean

  @Field()
  yextId: string
}
@ObjectType()
class LocationResponse {
  @Field(() => [Location])
  location?: Location[]
}

@Resolver(Location)
export class LocationResolver {
  
  @FieldResolver(() => String)
  async c_locationHighlights(@Root() location: Location) {
    return location.c_locationHighlights.replace(/{/g, '[').replace(/}/g, ']')
  }

  @FieldResolver(() => String)
  async hoursString(@Root() location: Location) {
    let hours = JSON.parse(location.hours)
    let openString = await ShowOpenHours(hours, location.timezone)
    return openString
  }

  @FieldResolver(() => String)
  async hours(@Root() location: Location) {
    let hours = JSON.parse(location.hours)

    await Object.keys(hours).map(async (day) => {
      if (hours[day].openIntervals[0].start) {
        hours[day].openIntervals[0].start = await Convert24HourTo12Hour(hours[day].openIntervals[0].start)
        if (hours[day].openIntervals[0].start.length === 7) {
          hours[day].openIntervals[0].start = '0' + hours[day].openIntervals[0].start
        }
      }
    }) 
    await Object.keys(hours).map(async (day) => {
      if (hours[day].openIntervals[0].end) {

        hours[day].openIntervals[0].end = await Convert24HourTo12Hour(hours[day].openIntervals[0].end)
        if (hours[day].openIntervals[0].end.length === 7) {
          hours[day].openIntervals[0].end = '0' + hours[day].openIntervals[0].end
        }
      }
    }) 

    return JSON.stringify(hours)
  }


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

  @Query(() => Location, { nullable: true })
  async location(
    @Arg("yextId") yextId: string
  ) {
    const location = await Location.find({where: {yextId}})
    return location[0]
  }


  @Mutation(() => Location)
  async updateVisibility(
    @Arg("input") input: UpdateVisibleInput): Promise<Boolean> {
    await getConnection()
    .createQueryBuilder()
    .update(Location)
    .set({ 
      visible: input.visible
    })
    .where("yextId = :id", { id: input.yextId })
    .execute();
    return true
  }

  @Mutation(() => Location)
  async updateComingSoon(
    @Arg("input") input: UpdateComingSoonInput): Promise<Boolean> {
    await getConnection()
    .createQueryBuilder()
    .update(Location)
    .set({ 
      comingSoon: input.comingSoon
    })
    .where("yextId = :id", { id: input.yextId })
    .execute();
    return true
  }

  @Mutation(() => Boolean)
  async addLocation(@Arg("options") options: LocationInput): Promise<Boolean> {
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

    console.log('location', location.id)
    return true
  }
}
