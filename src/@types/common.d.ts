interface IMenu {
  id: string
  path?: string
  name?: string
  subTitle?: string
  children?: IMenu[]
  hide?: boolean
  parentId?: string
  icon?: React.ReactElement
  component?: React.ReactElement
  auth?: boolean
}
