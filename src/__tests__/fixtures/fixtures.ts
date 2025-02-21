const hosts = [
  {
    id: 1,
    ip: "1.2.3.4.5",
    services: [
      {
        extended_service_name: "HTTP",
        port: 123,
      },
      {
        extended_service_name: "HTTP",
        port: 456,
      },
      {
        extended_service_name: "HTTPS",
        port: 789,
      },
    ],
  },
  {
    id: 2,
    ip: "6.7.8.9.0",
    services: [
      {
        extended_service_name: "HTTP",
        port: 123,
      },
      {
        extended_service_name: "HTTP",
        port: 456,
      },
      {
        extended_service_name: "HTTPS",
        port: 789,
      },
    ],
  },
  {
    id: 3,
    ip: "99.8.7.6.5",
    services: [
      {
        extended_service_name: "HTTP",
        port: 123,
      },
      {
        extended_service_name: "HTTP",
        port: 456,
      },
      {
        extended_service_name: "HTTPS",
        port: 789,
      },
    ],
  },
];

export { hosts };
