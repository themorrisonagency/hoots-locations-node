import { Column } from "typeorm";
import { OpenIntervals } from "./OpenIntervals";

export class Hours {
    @Column({type: 'json'})
    monday: OpenIntervals;

    @Column({type: 'json'})
    tuesday: OpenIntervals;
    
    @Column({type: 'json'})
    wednesday: OpenIntervals;

    @Column({type: 'json'})
    thursday: OpenIntervals;

    @Column({type: 'json'})
    friday: OpenIntervals;

    @Column({type: 'json'})
    saturday: OpenIntervals;

    @Column({type: 'json'})
    sunday: OpenIntervals;
}