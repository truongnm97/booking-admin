interface IAuthReducer extends ILoginResponse {}

interface IGetMeReducer extends IGetMe {}

interface IAppState {
  auth: string | null
  getMe: IGetMeReducer | null
}
