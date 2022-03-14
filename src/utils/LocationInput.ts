import { InputType, Field } from "type-graphql";


@InputType()
export class LocationInput {
    @Field()
    c_oloID?: string
    @Field()
    address?: string
    @Field()
    description?: string
    @Field()
    hours: string
    @Field()
    c_cateringURL: string
    @Field()
    c_locationHighlights: string
    @Field()
    c_locationShortName: string
    @Field()
    c_locationSlug: string
    @Field()
    c_locationName: string
    @Field()
    c_mapTile: string
    @Field()
    c_promoGraphic: string
    @Field()
    c_masthead: string
    @Field()
    c_mapUrl: string
    @Field()
    visible: boolean
    @Field()
    comingSoon: boolean
    @Field()
    c_comingSoonText: string
    @Field()
    c_promoUrl:string
    @Field()
    c_shortDescription: string
    @Field()
    geocodedCoordinate: string
    @Field()
    mainPhone: string
    @Field()
    orderUrl: string
    @Field()
    yextId: string
}
