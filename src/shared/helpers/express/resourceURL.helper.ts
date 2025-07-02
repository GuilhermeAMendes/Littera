// External library
import { Request } from "express";

type ResourceLinkProps = {
  request: Request;
  path: string;
};

export function buildResourceLink({ request, path }: ResourceLinkProps) {
  const baseURL = `${request.protocol}://${request.get("host")}`;
  return `${baseURL}/${path}`;
}
