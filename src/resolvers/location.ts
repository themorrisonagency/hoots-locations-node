import axios from "axios"
import { Arg, Field, FieldResolver, InputType, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql"
import { getConnection } from "typeorm"
import { Location } from "../entities/Location"
import { LocationInput } from "../utils/LocationInput"
import ShowOpenHours from "../utils/ShowOpenHours"
import { Convert24HourTo12Hour } from '../utils/timeConversion'

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
  locations: Location[];
  @Field()
  devMode: boolean;
  @Field()
  dbMode: string;
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
    if (location.hours === "" || location.hours === null){
      console.log('template')
      const template = {
        monday: {isClosed: true},
        tuesday: {isClosed: true},
        wednesday: {isClosed: true},
        thursday: {isClosed: true},
        friday: {isClosed: true},
        saturday: {isClosed: true},
        sunday: {isClosed: true}
      }
      console.log(JSON.stringify(template))
      return JSON.stringify(template)
    }
    let hours = JSON.parse(location.hours)

    await Object.keys(hours).map(async (day) => {

      if (hours[day].isClosed)
      return hours[day].isClosed
      console.log('start/end', hours[day].openIntervals[0].start.length, hours[day].openIntervals[0].end.length)
      if (hours[day].openIntervals) {
        hours[day].openIntervals[0].start = await Convert24HourTo12Hour(hours[day].openIntervals[0].start)
      }
    }) 
    await Object.keys(hours).map(async (day) => {
      if (hours[day].openIntervals) {

        hours[day].openIntervals[0].end = await Convert24HourTo12Hour(hours[day].openIntervals[0].end)

      }
    }) 

    return JSON.stringify(hours)
  }


  @Query(() => LocationResponse, {nullable: true})
  async locations(){

    const locations = await getConnection()
    .query(`
    SELECT p.*
    FROM location p
    WHERE name = 'Hoots Wings'
    ORDER BY "c_locationName"`)// Typeorm requires camelCase variables to be wrapped in double qoutes.

    for (const location of locations) {
      Object.keys(location).forEach(key => {
        if (location[key] === null) {
          location[key] = '';
        }
      });
    }

    const yextStatus = await axios.get(`http://localhost:${process.env.PORT}/hooks/yext_account`)
    const dbMode = (process.env.DATABASE_URL.includes("staging")) ? "staging" : "production"
    return {locations, devMode: yextStatus.data.includes('Developer Account'), dbMode}
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
        .values({...options})
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
