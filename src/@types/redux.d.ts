interface IAuthReducer extends ILoginResponse {}

interface IGetMeReducer extends IUser {}

interface IAppState {
  auth: string | null
  getMe: IGetMeReducer | null
}
