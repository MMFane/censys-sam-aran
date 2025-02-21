import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";
import { Host } from "../types/types";
import HostCard from "./HostCard";

function HostList() {
  const [hosts, setHosts] = useState<Array<Host>>([]);
  const [cursor, setCursor] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHosts = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const data = await dataService.fetchHosts(cursor);
      setHosts((prevHosts) => [...prevHosts, ...data.hosts]);
      setCursor(data.next);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error("Error fetching hosts:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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
      {isLoading && <p>Loading...</p>}
      {hasMore && (
        <button
          onClick={async () => {
            fetchHosts();
          }}
        >
           Load More
        </button>
      )}
    </>
  );
}

export default HostList;
