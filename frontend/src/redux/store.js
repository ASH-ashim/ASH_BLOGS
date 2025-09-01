import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from './authSlice.js' 
import blogSlice from './blogSlice.js'
import themeSlice from './themeSlice.js'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist"
import storage from "redux-persist/lib/storage";
import commentSlice from "./commentSlice.js"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

    const rootReducer = combineReducers({
        auth: authSlice,
        theme: themeSlice,
        blog: blogSlice,
        comment: commentSlice
    })
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    })
export default store;