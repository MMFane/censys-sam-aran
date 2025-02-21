type Host = {
  id: number;
  ip: string;
  services: Array<Service>;
};

type Service = {
  extended_service_name: string;
  port: number;
};

export type { Host, Service };
