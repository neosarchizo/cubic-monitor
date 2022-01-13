import {Strings, Language} from '../../../constants/strings/types'

export type Locale = keyof Strings

export type Text = keyof Language

export type Translation = {
  t: (text: Text) => string
}

export type I18n = () => Translation
