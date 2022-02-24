import { Column } from "typeorm";
import { StartEndTime } from "./StartEndTimeType";

export class OpenIntervals {
    @Column({type: 'json'})
    openIntervals: StartEndTime
}