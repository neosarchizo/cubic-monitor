import {app} from 'electron'
import path from 'path'
import Sqlite3 from 'sqlite3'

export const getDb: () => Sqlite3.Database = () =>
  new Sqlite3.Database(path.join(app.getPath('downloads'), 'cubic.db'))
