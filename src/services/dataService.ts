import axios from "axios";
import { Host, PaginatedHosts } from "../types/types";

const dataService = {
  fetchHosts: async (cursor?: string): Promise<PaginatedHosts> => {
    try {
      const username = process.env.API_ID;
      const password = process.env.API_PASSWORD;
      if (!username || !password) {
        throw new Error("API username and password are missing");
      }
      const res = await axios.get(
        `https://search.censys.io/api/v2/hosts/search?per_page=5&virtual_hosts=INCLUDE${ cursor ? `&cursor=${cursor}` : ''}`,
        {
          auth: {
            username,
            password,
          },
        }
      );
      // temporary eslint disable to get things moving - if time will go back and implement censys/censys-typescript package to get types
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hosts: Array<Host> = res.data.result.hits.map((host: any) => {
        return {
          ip: host.ip,
          services: host.services,
        };
      });
      const next = res.data.result.links.next;
      return {hosts, next: next};
    } catch (error) {
      console.error("Error fetching hosts:", error);

      throw error;
    }
  },
};

export { dataService };
