import { Request, Response, NextFunction } from "express";

export type HttpVerb = "get" | "post" | "patch" | "put" | "delete";

type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const HttpMethods = {
  GET: "get" as HttpVerb,
  POST: "post" as HttpVerb,
  PUT: "put" as HttpVerb,
  PATCH: "patch" as HttpVerb,
  DELETE: "delete" as HttpVerb,
} as const;

export interface Route {
  getMiddlewares?(): ExpressMiddleware;
  getHandler(): (req: Request, res: Response) => Promise<void>;
  getPath(): string;
  getVerb(): HttpVerb;
}
