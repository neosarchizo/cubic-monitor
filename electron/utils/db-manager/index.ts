import {app} from 'electron'

import Sqlite3 = require('sqlite3')
import path = require('path')

export const getDb: () => Sqlite3.Database = () => {
  return new Sqlite3.Database(path.join(app.getPath('downloads'), 'cubic.db'))
}

export const Dummy = ''
