import { Request, Response } from "express";
import "express-session";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}
export type MyContext = {
  req: Request;
  //   redis: Redis;
  res: Response;
};
