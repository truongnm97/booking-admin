import { useSelector } from 'react-redux'

const useAppState = <T extends (state: IAppState) => ReturnType<T>>(
  selector: T
): ReturnType<T> => useSelector(selector)

export default useAppState
