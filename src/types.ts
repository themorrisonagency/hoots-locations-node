import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyContext = {
  req: Request & { session: Express.Session };
  redis: Redis;
  res: Response;
};

// export type StartEndTime = {
//   start: string,
//   end: string
// }

// export type HourDay = {
//   openIntervals: StartEndTime[]
// }

// export type Hour = {
//   monday: HourDay[]
//   tuesday: HourDay[]
//   wednesday: HourDay[]
//   thursday: HourDay[]
//   friday: HourDay[]
// }