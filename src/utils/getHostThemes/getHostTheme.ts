import { GraphQLClient } from "graphql-request";
import { GET_THEME, GET_MEMBERS_TABLE } from "./gql";
const client = new GraphQLClient("http://localhost:4000", {
  headers: {},
});
export const getHostTheme = async (host: string) => {
  try {
    const { results }: any = await client.request(GET_THEME, {
      host,
    });
    if (results) {
      return results;
    }
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
  }
};

export const getHostConfig = async (host: string) => {
  try {
    const { results }: any = await client.request(GET_MEMBERS_TABLE, {
      host,
    });
    if (results) {
      return results;
    }
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
  }
};
