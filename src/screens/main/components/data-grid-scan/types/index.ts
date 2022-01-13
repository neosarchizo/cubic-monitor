export interface Row {
  id: string
  port: string
}

export interface Props {
  selectionModel
  onChange: (selectionModel) => void
}
