export const QUERY_IS_TABLE_EXISTED: (name: string) => string = (name) =>
  `SELECT * FROM sqlite_schema WHERE type = 'table' AND name ='${name}';`

export const QUERY_GET_RANGE: (name: string, serialNumber: string) => string = (
  name,
  serialNumber,
) =>
  `SELECT MAX(TIMESTAMP) AS max, MIN(TIMESTAMP) AS min FROM ${name} WHERE SERIAL_NUMBER == "${serialNumber}";`
