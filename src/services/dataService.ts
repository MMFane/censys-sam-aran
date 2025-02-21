import axios from "axios";
import { Host, PaginatedHosts } from "../types/types";

const dataService = {
  fetchHosts: async (
    cursor?: string,
    query?: string
  ): Promise<PaginatedHosts> => {
    try {
      const username = process.env.API_ID;
      const password = process.env.API_PASSWORD;
      if (!username || !password) {
        throw new Error("API username and password are missing");
      }
      const res = await axios.get(
        `https://search.censys.io/api/v2/hosts/search?${
          query ? `q=${query}&` : ""
        }per_page=5&virtual_hosts=INCLUDE${cursor ? `&cursor=${cursor}` : ""}`,
        {
          auth: {
            username,
            password,
          },
        }
      );
      // To be improved: rather than this bandaind eslint disable, if I had more time, I'd grab the real types from the censys/censys-typescript.
      // I could also use the client in this package rather than an axios call
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hosts: Array<Host> = res.data.result.hits.map((host: any) => {
        return {
          ip: host.ip,
          services: host.services,
        };
      });
      const next = res.data.result.links.next;
      return { hosts, next: next };
    } catch (error) {
      console.error("Error fetching hosts:", error);

      throw error;
    }
  },
};

export { dataService };
