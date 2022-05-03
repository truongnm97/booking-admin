import { Role } from 'constants/enum'
import { WHITELIST_ROUTES } from 'config/menu'

export const checkAuthorization = (val?: IMenu, role?: Role) =>
  Boolean(
    val &&
      (WHITELIST_ROUTES.includes(val.id) || (role && val.role?.includes(role)))
  )
