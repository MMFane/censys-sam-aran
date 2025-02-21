type Host = {
  ip: string;
  services: Array<Service>;
};

type Service = {
  extended_service_name: string;
  port: number;
};

type PaginatedHosts = {
  hosts: Array<Host>;
  next: string;
};

export type { Host, PaginatedHosts, Service };
