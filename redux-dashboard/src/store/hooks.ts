import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './index'

// What for: typed hooks — avoid repeating RootState / AppDispatch in every component.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
