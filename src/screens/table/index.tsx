import {useState, VFC, useEffect, useCallback} from 'react'
import {Grid} from '@material-ui/core'

import {Layout, ModelSelect, SerialNumberSelect} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, GridContainer} from './styles'
import {useDb} from '../../contexts/db'
import {EventListener} from '../../contexts/db/types'

const Main: VFC = () => {
  const {t} = useI18n()
  const [dbManager] = useDb()

  const [modelOption, setModelOption] = useState<string>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')

  useEffect(() => {
    if (serialNumberOption === 'NONE') {
      return
    }

    dbManager.getData(modelOption, serialNumberOption)
  }, [dbManager, modelOption, serialNumberOption])

  const handleOnDbEvent = useCallback<EventListener>(
    (event) => {
      const {type, payload} = event

      switch (type) {
        case 'GET_DATA': {
          const param = payload as {name: string; serialNumber: string; data: []}

          const {name, serialNumber, data} = param

          if (name !== modelOption || serialNumber !== serialNumberOption) {
            return
          }

          console.log('here!!', data)
          break
        }

        default:
          break
      }
    },
    [modelOption, serialNumberOption],
  )

  useEffect(() => {
    const subscription = dbManager.subscribe(handleOnDbEvent)

    return () => {
      subscription.unsubscribe()
    }
  }, [dbManager, handleOnDbEvent])

  return (
    <Layout title={t('table')}>
      <Container>
        <GridContainer>
          <Grid item xs={12} sm={6} md={3}>
            <ModelSelect value={modelOption} onChange={setModelOption} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SerialNumberSelect
              model={modelOption}
              value={serialNumberOption}
              onChange={setSerialNumberOption}
            />
          </Grid>
        </GridContainer>
      </Container>
    </Layout>
  )
}

export default Main
