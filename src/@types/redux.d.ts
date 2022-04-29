interface IAuthReducer extends IUser {}

interface IGetMeReducer extends IGetMe {
  functionsMap: Record<string, IFunction>
}

interface IAppState {
  auth: IUser | null
  getMe: IGetMeReducer | null
}
