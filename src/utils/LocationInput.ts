import { InputType, Field } from "type-graphql";


@InputType()
export class LocationInput {
    @Field()
    hours?: string;
}
