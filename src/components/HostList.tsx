import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";
import { Host } from "../types/types";
import HostCard from "./HostCard";

function HostList() {
  const [hosts, setHosts] = useState<Array<Host>>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await dataService.fetchHosts();
        setHosts(data);
      } catch (error) {
        console.error("Error fetching hosts:", error);
        throw error;
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h2>Host List</h2>
      <ul>
        {hosts.map((host: Host) => (
          <HostCard key={host.ip} host={host} />
        ))}
      </ul>
    </>
  );
}

export default HostList;
