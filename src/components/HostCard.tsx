import { useState, useEffect } from "react";
import type { Host } from "../types/types";
import countBy from "lodash/countBy";
import { Dictionary } from "lodash";

interface HostProps {
  host: Host;
}

function HostCard({ host }: HostProps) {
  const [aggregatedServiceNames, setAggregatedServiceNames] =
    useState<Dictionary<number>>();

  useEffect(() => {
    const serviceNames = host.services.map(
      (service) => service.extended_service_name
    );
    const aggregatedServiceNames = countBy(serviceNames);

    setAggregatedServiceNames(aggregatedServiceNames);
  }, [host]);

  return (
    <>
      <li>
        <p>{host.ip}</p>
        <ul>
          {aggregatedServiceNames &&
            Object.entries(aggregatedServiceNames).map((entry) => {
              return (
                <li key={entry[0]}>
                  {entry[0]}: {entry[1]}
                </li>
              );
            })}
        </ul>
      </li>
    </>
  );
}

export default HostCard;
