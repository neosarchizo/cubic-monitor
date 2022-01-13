import i18n from 'i18next'
import {initReactI18next, useTranslation} from 'react-i18next'

import Strings from '../../constants/strings'
import {I18n} from './types'

export const init: () => void = () => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: Strings,
      lng: 'ko',

      keySeparator: false, // we do not use keys in form messages.welcome

      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    })
}

export const useI18n: I18n = useTranslation
