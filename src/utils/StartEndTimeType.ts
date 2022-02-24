import { Column } from "typeorm";

export class StartEndTime {
    @Column()
    start: string

    @Column()
    end: string
}