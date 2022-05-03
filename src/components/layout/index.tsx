import {FC, useState} from 'react'
import {Menu} from '@material-ui/icons'
import {Drawer} from '@material-ui/core'

import DrawerContent from './components/drawer-content'
import {Container, MyAppBar, MyToolbar, Content, MyIconButton, Title} from './styles'
import {Props} from './types'

const Main: FC<Props> = (props) => {
  const {children, title, hideDrawer, hideAppBar} = props

  const [open, setOpen] = useState<boolean>(false)

  const handleOnDrawerToggle: (o: boolean) => () => void = (o: boolean) => () => {
    setOpen(o)
  }

  return (
    <Container>
      {hideAppBar ? null : (
        <MyAppBar>
          <MyToolbar>
            {hideDrawer ? null : (
              <MyIconButton onClick={handleOnDrawerToggle(true)} aria-label="menu">
                <Menu />
              </MyIconButton>
            )}
            <Title>{title}</Title>
          </MyToolbar>
        </MyAppBar>
      )}
      <Content>{children}</Content>
      <Drawer open={open} onClose={handleOnDrawerToggle(false)}>
        <DrawerContent onToggle={handleOnDrawerToggle} />
      </Drawer>
    </Container>
  )
}

export default Main
