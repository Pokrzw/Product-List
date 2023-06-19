import { Request, RequestHandler } from "express";

const captureAccessToken = (): RequestHandler => {
  return (req: Request & { token?: string }, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      req.token = undefined;
      return next();
    }

    const [type, token] = authorization.split(" ");
    if (type != "Bearer") {
      req.token = undefined;
      return next();
    }

    req.token = token.trim();

    return next();
  };
};

export { captureAccessToken };
