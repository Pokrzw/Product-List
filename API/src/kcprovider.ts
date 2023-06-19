import { Client, Issuer } from "openid-client";

let IdP: Issuer;
let IdPClient: Client;

interface InitializeIdentityProviderConfig {
  well_known_url: string;
  client_id: string;
  client_secret?: string;
}

const initializeIdentityProvider = async ({
  well_known_url,
  client_id,
  client_secret,
}: InitializeIdentityProviderConfig) => {
  try {
    IdP = await Issuer.discover(well_known_url);
    console.log(IdP.metadata)
    IdPClient = new IdP.Client({
      client_id,
      client_secret,
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

export { initializeIdentityProvider, getIdPClient };