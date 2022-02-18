export const QUERY_IS_TABLE_EXISTED: (name: string) => string = (name) =>
  `SELECT * FROM sqlite_schema WHERE type = 'table' AND name ='${name}';`

export const DUMMY = ''
