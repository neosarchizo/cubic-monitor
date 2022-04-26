export const QUERY_IS_TABLE_EXISTED: (name: string) => string = (name) =>
  `SELECT * FROM sqlite_schema WHERE type = 'table' AND name ='${name}';`

export const QUERY_GET_RANGE: (name: string, serialNumber: string) => string = (
  name,
  serialNumber,
) =>
  `SELECT MAX(TIMESTAMP) AS max, MIN(TIMESTAMP) AS min, COUNT(*) as count FROM ${name} WHERE SERIAL_NUMBER == "${serialNumber}";`

export const QUERY_GET_COUNT_BY_RANGE: (
  name: string,
  serialNumber: string,
  startedAt: string,
  endedAt: string,
) => string = (name, serialNumber, startedAt, endedAt) =>
  `SELECT COUNT(*) as count FROM ${name} WHERE SERIAL_NUMBER == "${serialNumber}" AND "${startedAt}" <= TIMESTAMP AND "${endedAt}" >= TIMESTAMP;`

export const QUERY_GET_DATA_FROM_TABLE: (
  name: string,
  serialNumber: string,
  startedAt: string,
  endedAt: string,
) => string = (name, serialNumber, startedAt, endedAt) =>
  `SELECT * FROM ${name} WHERE SERIAL_NUMBER == "${serialNumber}" AND "${startedAt}" <= TIMESTAMP AND "${endedAt}" >= TIMESTAMP;`
