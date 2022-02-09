import {VFC, useCallback, useEffect, useMemo, useState, ReactElement, ChangeEvent} from 'react'
import {Button, FormControl, Select, MenuItem} from '@material-ui/core'
import {
  GridColumns,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridCellValue,
} from '@mui/x-data-grid'
import {Add, Remove, PlayArrow, Stop} from '@material-ui/icons'

import Layout from '../../components/layout'
import {
  Container,
  Body,
  DataGridContainer,
  RowButton,
  MyDataGrid,
  Row,
  MyIconButton,
} from './styles'
import {useI18n} from '../../utils/i18n'
import {useDevice} from '../../contexts/device'
import {EventListener, DeviceModel, Device, Port} from '../../contexts/device/types'
import {Path} from './types'

const Main: VFC = () => {
  const {t} = useI18n()
  const [deviceState, deviceManager] = useDevice()

  const {devices} = deviceState

  const [pathes, setPathes] = useState<Path[]>([])

  const handleOnModelChange: (id: string) => (event: ChangeEvent<{value: unknown}>) => void =
    useCallback(
      (id) => (event) => {
        const {target} = event
        const {value} = target

        setPathes((v) =>
          v.map((p) => {
            const {id: pId} = p

            if (id !== pId) {
              return p
            }

            return {
              ...p,
              model: value as DeviceModel,
            }
          }),
        )
      },
      [],
    )

  const renderModelCell: (params: GridRenderCellParams) => ReactElement = useCallback(
    (params) => {
      const {row} = params

      const data = row as Path

      const {path, model} = data

      return (
        <FormControl style={{width: '100%'}}>
          <Select value={model} onChange={handleOnModelChange(path)} style={{width: '100%'}}>
            <MenuItem value="PM2008">PM2008</MenuItem>
            <MenuItem value="CM1106">CM1106</MenuItem>
            <MenuItem value="AM1008W-K">AM1008W-K</MenuItem>
            <MenuItem value="CM1107">CM1107</MenuItem>
          </Select>
        </FormControl>
      )
    },
    [handleOnModelChange],
  )

  const handleOnAddPress: (path: string, model: DeviceModel) => () => void = useCallback(
    (path, model) => () => {
      deviceManager.add(path, model)

      setPathes((v) =>
        v.filter((p) => {
          const {path: pPath} = p

          return path !== pPath
        }),
      )
    },
    [deviceManager],
  )

  const handleOnRemovePress: (path: string) => () => void = useCallback(
    (path) => () => {
      deviceManager.remove(path)
    },
    [deviceManager],
  )

  const renderTopOptionCell: (params: GridRenderCellParams) => ReactElement = useCallback(
    (params) => {
      const {row} = params

      const data = row as Path

      const {path, model} = data

      return (
        <Row>
          <MyIconButton onClick={handleOnAddPress(path, model)}>
            <Add />
          </MyIconButton>
        </Row>
      )
    },
    [handleOnAddPress],
  )

  const handleOnPlayPress = useCallback<(path: string) => () => void>(
    (path) => () => {
      deviceManager.play(path)
    },
    [deviceManager],
  )

  const handleOnStopPress = useCallback<(path: string) => () => void>(
    (path) => () => {
      deviceManager.stop(path)
    },
    [deviceManager],
  )

  const renderBottomOptionCell: (params: GridRenderCellParams) => ReactElement = useCallback(
    (params) => {
      const {row} = params

      const data = row as Device

      const {id, recording} = data

      return (
        <Row>
          {recording ? (
            <MyIconButton onClick={handleOnStopPress(id)}>
              <Stop />
            </MyIconButton>
          ) : (
            <MyIconButton onClick={handleOnPlayPress(id)}>
              <PlayArrow />
            </MyIconButton>
          )}

          <MyIconButton onClick={handleOnRemovePress(id)}>
            <Remove />
          </MyIconButton>
        </Row>
      )
    },
    [handleOnPlayPress, handleOnRemovePress, handleOnStopPress],
  )

  const topColumns = useMemo<GridColumns>(() => {
    return [
      {field: 'path', headerName: t('path'), width: 300},
      {field: 'model', headerName: t('model'), width: 150, renderCell: renderModelCell},
      {field: ' ', headerName: '', width: 150, renderCell: renderTopOptionCell},
    ]
  }, [t, renderModelCell, renderTopOptionCell])

  const handleOnSerialNumberFormat: (params: GridValueFormatterParams) => GridCellValue = (
    params,
  ) => {
    let result = ''

    const {id} = params

    const device = devices.find((d) => {
      const {id: dId} = d
      return id === dId
    })

    if (device === undefined || device === null) {
      return result
    }

    const {model, pm2008, cm1106, cm1107, am1008wk} = device

    switch (model) {
      case 'PM2008': {
        if (pm2008 === undefined) {
          break
        }

        const {serialNumber} = pm2008

        if (serialNumber === null) {
          break
        }

        result = serialNumber
        break
      }
      case 'CM1106': {
        if (cm1106 === undefined) {
          break
        }

        const {serialNumber} = cm1106

        if (serialNumber === null) {
          break
        }

        result = serialNumber
        break
      }
      case 'CM1107': {
        if (cm1107 === undefined) {
          break
        }

        const {serialNumber} = cm1107

        if (serialNumber === null) {
          break
        }

        result = serialNumber
        break
      }
      case 'AM1008W-K': {
        if (am1008wk === undefined) {
          break
        }

        const {serialNumber} = am1008wk

        if (serialNumber === null) {
          break
        }

        result = serialNumber
        break
      }

      default:
        break
    }

    return result
  }

  const handleOnSwVersionFormat: (params: GridValueFormatterParams) => GridCellValue = (params) => {
    let result = ''

    const {id} = params

    const device = devices.find((d) => {
      const {id: dId} = d
      return id === dId
    })

    if (device === undefined || device === null) {
      return result
    }

    const {model, pm2008, cm1106, cm1107, am1008wk} = device

    switch (model) {
      case 'PM2008': {
        if (pm2008 === undefined) {
          break
        }

        const {swVer} = pm2008

        if (swVer === null) {
          break
        }

        result = swVer
        break
      }
      case 'CM1106': {
        if (cm1106 === undefined) {
          break
        }

        const {swVer} = cm1106

        if (swVer === null) {
          break
        }

        result = swVer
        break
      }
      case 'CM1107': {
        if (cm1107 === undefined) {
          break
        }

        const {swVer} = cm1107

        if (swVer === null) {
          break
        }

        result = swVer
        break
      }
      case 'AM1008W-K': {
        if (am1008wk === undefined) {
          break
        }

        const {swVer} = am1008wk

        if (swVer === null) {
          break
        }

        result = swVer
        break
      }

      default:
        break
    }

    return result
  }

  const bottomColumns = useMemo<GridColumns>(() => {
    return [
      {field: 'id', headerName: t('path'), width: 300},
      {field: 'model', headerName: t('model'), width: 150},
      {
        field: 'serialNumber',
        headerName: t('serialNumber'),
        width: 200,
        valueFormatter: handleOnSerialNumberFormat,
      },
      {
        field: 'swVersion',
        headerName: t('swVersion'),
        width: 150,
        valueFormatter: handleOnSwVersionFormat,
      },
      {field: ' ', headerName: '', width: 150, renderCell: renderBottomOptionCell},
    ]
  }, [t, renderBottomOptionCell])

  const handleOnList: EventListener = useCallback((event) => {
    const {type, payload} = event

    if (type !== 'LIST') {
      return
    }

    const ps = payload as Port[]

    setPathes(
      ps.map((p) => {
        const {path} = p

        return {
          id: path,
          path,
          model: 'PM2008',
        }
      }),
    )
  }, [])

  useEffect(() => {
    const sub = deviceManager.subscribe(handleOnList)

    return () => {
      sub.unsubscribe()
    }
  }, [deviceManager, handleOnList])

  const handleOnRefreshClick: () => void = useCallback(() => {
    deviceManager.list()
  }, [deviceManager])

  return (
    <Layout title={t('devices')}>
      <Container>
        <Body>
          <DataGridContainer>
            <MyDataGrid rows={pathes} columns={topColumns} />
          </DataGridContainer>
          <RowButton>
            <Button variant="contained" color="primary" onClick={handleOnRefreshClick}>
              {t('refresh')}
            </Button>
          </RowButton>
          <DataGridContainer>
            <MyDataGrid rows={devices} columns={bottomColumns} />
          </DataGridContainer>
        </Body>
      </Container>
    </Layout>
  )
}

export default Main
