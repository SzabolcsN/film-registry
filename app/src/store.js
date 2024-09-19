import { configureStore } from '@reduxjs/toolkit'
import filmList from './reducers/film'
import theme from './reducers/theme';

export default configureStore({
  reducer: {
    filmList,
    theme,
  },
});