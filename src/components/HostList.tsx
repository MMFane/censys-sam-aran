import { useState, useEffect } from "react";
import { dataService } from "../services/dataService";
import debounce from "lodash/debounce";
import { Host } from "../types/types";
import HostCard from "./HostCard";

function HostList() {
  const [hosts, setHosts] = useState<Array<Host>>([]);
  const [cursor, setCursor] = useState("");
  const [nextCursor, setNextCursor] = useState("");
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHosts = async (cursor: string, query: string) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const data = await dataService.fetchHosts(cursor, query);
      setHosts((prevHosts) => [...prevHosts, ...data.hosts]);
      setNextCursor(data.next);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error("Error fetching hosts:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // To be improved - manage dependencies so that we are able to satisfy this linting issue without triggering infinite rerenders
  // If we add fetchHosts to the dependecy array here, that shifts the problem to fetchHosts(), which then needs to be wrapped in useCallback()
  // and will then require isLoading and hasMore in its dependency array, which also currently triggers the same issue 
  // I felt it was cleaner to leave it here for now
  useEffect(() => {
    fetchHosts(cursor, query);
  }, [cursor, query]);

  return (
    <>
      <h2>Host List</h2>
      <div>
        <label htmlFor="query">Filter Hosts</label>
        <input
          name="query"
          id="query"
          type="text"
          onChange={debounce((e) => {
            setHosts([]);
            setCursor("");
            setQuery(e.target.value);
          }, 300)}
        />
      </div>
      <ul>
        {hosts.map((host: Host) => (
          <HostCard key={host.ip} host={host} />
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {hasMore && (
        <button
          onClick={async () => {
            setCursor(nextCursor);
          }}
        >
          Load More
        </button>
      )}
    </>
  );
}

export default HostList;
