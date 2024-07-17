import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const FetchAPIData = DefineFunction({
  callback_id: "fetch_api_data",
  title: "get api data ",
  description: "store the stringified api data in an output variable",
  source_file: "functions/fetch_api_data.ts",
  output_parameters: {
    properties: {
      api_response: {
        type: Schema.types.string,
        description: "the api response object",
      },
    },
    required: ["api_response"],
  },
});

export default SlackFunction(
  FetchAPIData,
  async () => {
    const API_URL = "https://pokeapi.co/api/v2/pokemon/ditto";
    let stringifiedResponse = "";
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      stringifiedResponse = JSON.stringify(jsonResponse);

      // Handle the event when the API response is surpasses the slack message character limit
      const maxCharactersAllowed = 12900;
      if (stringifiedResponse.length > maxCharactersAllowed) {
        stringifiedResponse = stringifiedResponse.slice(
          0,
          maxCharactersAllowed,
        );
        console.error(
          `The API response contained ${
            JSON.stringify(jsonResponse).length
          } characters and is greater than the maximum characters allowed in a Slack message: ${maxCharactersAllowed}. The remaining characters will be included in the output variable`,
        );
      }
      console.log(stringifiedResponse);
    } catch (error) {
      console.error(
        `error occurred fetching information from ${API_URL}:`,
        error,
      );
    }

    // Specifying these variables as output will allow them to be used by the next step in the workflow
    return {
      outputs: {
        api_response: stringifiedResponse,
      },
    };
  },
);
