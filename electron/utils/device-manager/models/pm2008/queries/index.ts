const TABLE_NAME = 'PM2008'

export const QUERY_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  SERIAL_NUMBER TEXT NOT NULL,
  TIMESTAMP TEXT NOT NULL,
  PM_1P0_GRIMM INTEGER NOT NULL,
  PM_2P5_GRIMM INTEGER NOT NULL,
  PM_10P_GRIMM INTEGER NOT NULL,
  PM_1P0_TSI INTEGER NOT NULL,
  PM_2P5_TSI INTEGER NOT NULL,
  PM_10P_TSI INTEGER NOT NULL,
  PN_0P3 INTEGER NOT NULL,
  PN_0P5 INTEGER NOT NULL,
  PN_1P0 INTEGER NOT NULL,
  PN_2P5 INTEGER NOT NULL,
  PN_5P0 INTEGER NOT NULL,
  PN_10P INTEGER NOT NULL
)`

export const QUERY_INSERT_INTO = `
INSERT INTO ${TABLE_NAME} (
  SERIAL_NUMBER,
  TIMESTAMP,
  PM_1P0_GRIMM,
  PM_2P5_GRIMM,
  PM_10P_GRIMM,
  PM_1P0_TSI,
  PM_2P5_TSI,
  PM_10P_TSI,
  PN_0P3,
  PN_0P5,
  PN_1P0,
  PN_2P5,
  PN_5P0,
  PN_10P
)
VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`

export const QUERY_GET_SERIAL_NUMBERS = `SELECT DISTINCT SERIAL_NUMBER FROM ${TABLE_NAME} ORDER BY SERIAL_NUMBER ASC;`
