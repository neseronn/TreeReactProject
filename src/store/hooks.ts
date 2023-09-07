// import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from './store';
// import type { AppDispatch } from './store';

// export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
