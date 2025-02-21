import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";
import { Host } from "../types/types";
import HostCard from "./HostCard";

function HostList() {
  const [hosts, setHosts] = useState<Array<Host>>([]);
  const [cursor, setCursor] = useState("");

  const fetchHosts = async () => {
    try {
        const data = await dataService.fetchHosts(cursor);
        setHosts((prevHosts) => [...prevHosts, ...data.hosts]);
        setCursor(data.next);
      } catch (error) {
        console.error("Error fetching hosts:", error);
        throw error;
      }
  }

  useEffect(() => {
    fetchHosts();
  }, []);

  return (
    <>
      <h2>Host List</h2>
      <ul>
        {hosts.map((host: Host) => (
          <HostCard key={host.ip} host={host} />
        ))}
      </ul>
      <button
        onClick={async () => {
          fetchHosts()
        }}
      >
        Load More
      </button>
    </>
  );
}

export default HostList;
