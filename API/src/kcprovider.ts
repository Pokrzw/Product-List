import { Client, Issuer } from "openid-client";

let IdP: Issuer;
let IdPClient: Client;

interface IDConfig {
  url: string;
  client_id: string;
  secret?: string;
}

const IDProvider = async ({
  url,
  client_id,
  secret,
}: IDConfig) => {
  try {
    IdP = await Issuer.discover(url);
    IdPClient = new IdP.Client({
      client_id,
      secret,
    });
  } catch (err) {
    console.error(err);
  }
};

const getIdPClient = (): Client | undefined => {
  if (IdPClient) {
    return IdPClient;
  } else return undefined;
};

export { IDProvider, getIdPClient };