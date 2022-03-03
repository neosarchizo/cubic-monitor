export const QUERY_IS_TABLE_EXISTED: (name: string) => string = (name) =>
  `SELECT * FROM sqlite_schema WHERE type = 'table' AND name ='${name}';`

export const QUERY_GET_DATA: (name: string, serialNumber: string) => string = (
  name,
  serialNumber,
) => `SELECT * FROM ${name} WHERE SERIAL_NUMBER="${serialNumber}" ORDER BY ID DESC LIMIT 1000;`
