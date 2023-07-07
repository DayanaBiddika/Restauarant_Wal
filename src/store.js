import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../src/components/slices/loginSlice'

export const store=configureStore({
    reducer:{
      login:loginReducer
    }
})