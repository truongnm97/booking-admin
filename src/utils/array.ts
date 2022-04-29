/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'

export function treeify<T = any>({
  data = [],
  idAttr = 'id',
  parentAttr = 'parent',
  parentIdAttr = 'parentId',
  childrenAttr = 'children',
}: {
  data?: T[]
  idAttr?: string
  parentAttr?: string
  childrenAttr?: string
  parentIdAttr?: string
}) {
  if (!data || data.length === 0) {
    return data
  }

  const list = _.cloneDeep(data)
  const treeList: T[] = []
  const lookup = {}

  for (const obj of list) {
    lookup[obj[idAttr]] = obj
  }

  for (const obj of list) {
    const parentId = obj[parentIdAttr]
    const parent = lookup[parentId]

    if (parent != null) {
      let children = parent[childrenAttr]

      if (Array.isArray(children)) {
        children.push(obj)
      } else {
        children = [obj]
      }

      obj[parentAttr] = {
        ...parent,
        [childrenAttr]: undefined,
      }
    } else {
      treeList.push(obj)
    }
  }

  return treeList
}

export const getMap = (menu?: any[], key = 'id'): Record<string, any> => {
  return menu?.reduce((acc, val) => {
    const children = val.children ? getMap(val.children) : []

    return {
      ...acc,
      [val[key]]: { ...val, children },
    }
  }, {})
}

export const getFlatMap = (mainMenu: any[], parentId?: string): any[] => {
  const menu = _.cloneDeep(mainMenu)
  return menu
    .reduce<any[]>((acc: any, val: any) => {
      const children = val.children ? getFlatMap(val.children, val.id) : []
      if (children.length > 0) {
        val.children = undefined
      } else {
        val.parentId = parentId
      }
      return [...acc, val, ...children]
    }, [])
    .filter(Boolean)
}
