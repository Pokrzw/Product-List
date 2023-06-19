import { Request, RequestHandler } from "express";
import { getIdPClient } from "../kcprovider"

export interface ReqWithToken extends Request {
  token?: string;
}

const protectRoute =
  (roles: String[] = []): RequestHandler =>
  async (req: ReqWithToken, res, next) => {
    const { token } = req;

    if (!token) {
      return res.status(401).send("Access denied");
    }
    console.log("Has token");

    const IdPC = getIdPClient();
    if (!IdPC) throw new Error("Id Provider not initialized");
    const introspecInfo = await IdPC.introspect(token);
    console.log("It can be introspected");
    console.log(introspecInfo);

    if (!introspecInfo?.active) return res.status(401).send("Access denied");
    console.log("Isnt invalid");
    if (!roles.length) return next();
    // @ts-ignore
    const realmRoles: String[] = introspecInfo?.realm_access.roles;
    const hasNecessaryRoles = roles.reduce((acc, cur) => {
      return realmRoles.indexOf(cur) != -1 && acc;
    }, true);
    console.log(realmRoles);

    if (!hasNecessaryRoles) return res.status(401).send("Access denied");
    console.log("Has necessary roles");
    return next();
  };

export default protectRoute;