import type { Host } from "../types/types";

interface HostProps {
  host: Host;
}

function HostCard({ host }: HostProps) {
  return (
    <>
      <li>{host.ip}</li>
    </>
  );
}

export default HostCard;
