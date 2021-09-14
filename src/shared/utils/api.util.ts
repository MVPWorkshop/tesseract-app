import axios, { AxiosBasicCredentials } from "axios";
import { EAuthenticationType, IAuthenticationData } from "../services/rest/rest.service.types";
import { DynamicObject } from "../types/util.types";
import { APIError } from "./error.util";

function ApiClient(baseUrl: string, auth?: IAuthenticationData, additionalHeaders?: DynamicObject<string>) {
  let basicAuth: AxiosBasicCredentials | undefined;
  const headers: DynamicObject = {...additionalHeaders};

  if (auth) {
    if (auth.type === EAuthenticationType.OAUTH_TOKEN) {
      headers["Authorization"] = `token ${auth.token}`;
    }
    if (auth.type === EAuthenticationType.BASIC_AUTHENTICATION) {
      basicAuth = {
        password: auth.password,
        username: auth.username
      };
    }
  }

  const client = axios.create({
    baseURL: baseUrl,
    auth: basicAuth,
    headers
  });

  // Init the interceptors
  client.interceptors.response.use(
    function onResponse(response) {
      return response;
    },
    function onError(error) {
      return Promise.reject(
        new APIError(error.message)
      );
    }
  );

  return client;
}

export default ApiClient;
