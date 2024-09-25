import { configureStore } from '@reduxjs/toolkit'
import AllSlice from './Componat/slice/AllSlice'

export default configureStore({
  reducer: {
    counter: AllSlice,
  },
})
