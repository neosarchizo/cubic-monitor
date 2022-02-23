export const QUERY_IS_TABLE_EXISTED: (name: string) => string = (name) =>
  `SELECT * FROM sqlite_schema WHERE type = 'table' AND name ='${name}';`

export const QUERY_GET_SERIAL_NUMBERS: (name: string) => string = (name) =>
  `SELECT DISTINCT SERIAL_NUMBER FROM ${name} ORDER BY SERIAL_NUMBER ASC;`
