const TABLE_NAME = 'CBHCHOV4'

export const QUERY_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  SERIAL_NUMBER TEXT NOT NULL,
  TIMESTAMP TEXT NOT NULL,
  HCHO INTEGER NOT NULL,
  VOC INTEGER NOT NULL,
  TEMPERATURE INTEGER NOT NULL,
  HUMIDITY INTEGER NOT NULL,
  TVOC INTEGER NOT NULL,
  SENSOR_STATUS INTEGER NOT NULL,
  AUTO_CALIBRATION_SWITCH INTEGER NOT NULL
)`

export const QUERY_INSERT_INTO = `
INSERT INTO ${TABLE_NAME} (
  SERIAL_NUMBER,
  TIMESTAMP,
  HCHO,
  VOC,
  TEMPERATURE,
  HUMIDITY,
  TVOC,
  SENSOR_STATUS,
  AUTO_CALIBRATION_SWITCH
)
VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
`

export const QUERY_GET_SERIAL_NUMBERS = `SELECT DISTINCT SERIAL_NUMBER FROM ${TABLE_NAME} ORDER BY SERIAL_NUMBER ASC;`

export const QUERY_GET_DATA: (serialNumber: string) => string = (serialNumber) =>
  `
SELECT
  ID,
  TIMESTAMP,
  HCHO,
  VOC,
  TEMPERATURE,
  HUMIDITY,
  TVOC,
  SENSOR_STATUS,
  AUTO_CALIBRATION_SWITCH
FROM ${TABLE_NAME}
WHERE SERIAL_NUMBER = "${serialNumber}"
ORDER BY ID DESC
LIMIT 1000`
