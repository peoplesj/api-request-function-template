import { Manifest } from "deno-slack-sdk/mod.ts";
import { FetchAPIData } from "./functions/fetch_api_data.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "generic-api-function",
  description: "a API call that stores the response as an output",
  icon: "assets/default_new_app_icon.png",
  functions: [FetchAPIData],
  workflows: [],
  outgoingDomains: ["pokeapi.co"],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "channels:history",
  ],
});
