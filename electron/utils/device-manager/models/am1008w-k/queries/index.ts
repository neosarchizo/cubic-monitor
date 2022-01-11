const TABLE_NAME = 'AM1008WK'

export const QUERY_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  SERIAL_NUMBER TEXT NOT NULL,
  TIMESTAMP TEXT NOT NULL,
  CO2 INTEGER NOT NULL,
  VOC INTEGER NOT NULL,
  RELATED_HUMIDITY INTEGER NOT NULL,
  TEMPERATURE INTEGER NOT NULL,
  PM_1P0_GRIMM INTEGER NOT NULL,
  PM_2P5_GRIMM INTEGER NOT NULL,
  PM_10P_GRIMM INTEGER NOT NULL,
  VOC_NOW_REF INTEGER NOT NULL,
  VOC_REF_R_VALUE INTEGER NOT NULL,
  VOC_NOW_R_VALUE INTEGER NOT NULL,
  PM_SENSOR_STATE INTEGER NOT NULL
)`

export const QUERY_INSERT_INTO = `
INSERT INTO ${TABLE_NAME} (
  SERIAL_NUMBER,
  TIMESTAMP,
  CO2,
  VOC,
  RELATED_HUMIDITY,
  TEMPERATURE,
  PM_1P0_GRIMM,
  PM_2P5_GRIMM,
  PM_10P_GRIMM,
  VOC_NOW_REF,
  VOC_REF_R_VALUE,
  VOC_NOW_R_VALUE,
  PM_SENSOR_STATE
)
VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`
