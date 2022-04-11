import {FC, useMemo} from 'react'
import {Usb, ShowChart, TableChart, CloudDownload} from '@material-ui/icons'
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import {useLocation, Link} from 'react-router-dom'

import {Container} from './styles'
import {Props} from './types'
import {useI18n} from '../../../../utils/i18n'
import RouteMap from '../../../../constants/routes'

const {ROUTE_MAIN, ROUTE_TABLE, ROUTE_CHART, ROUTE_EXPORT} = RouteMap

const Main: FC<Props> = (props) => {
  const {onToggle} = props

  const location = useLocation()
  const {t} = useI18n()

  const pathname = useMemo<string>(() => {
    return location.pathname
  }, [location])

  return (
    <Container onClick={onToggle(false)} onKeyDown={onToggle(false)}>
      <List>
        <ListItem
          button
          key="usb"
          selected={pathname === ROUTE_MAIN}
          component={Link}
          to={ROUTE_MAIN}>
          <ListItemIcon>
            <Usb />
          </ListItemIcon>
          <ListItemText primary={t('devices')} />
        </ListItem>
        <ListItem
          button
          key="table"
          selected={pathname === ROUTE_TABLE}
          component={Link}
          to={ROUTE_TABLE}>
          <ListItemIcon>
            <TableChart />
          </ListItemIcon>
          <ListItemText primary={t('table')} />
        </ListItem>
        <ListItem
          button
          key="chart"
          selected={pathname === ROUTE_CHART}
          component={Link}
          to={ROUTE_CHART}>
          <ListItemIcon>
            <ShowChart />
          </ListItemIcon>
          <ListItemText primary={t('chart')} />
        </ListItem>
        <ListItem
          button
          key="export"
          selected={pathname === ROUTE_EXPORT}
          component={Link}
          to={ROUTE_EXPORT}>
          <ListItemIcon>
            <CloudDownload />
          </ListItemIcon>
          <ListItemText primary={t('export')} />
        </ListItem>
      </List>
    </Container>
  )
}

export default Main
