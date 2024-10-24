import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import firebaseConfig from './firebase.config.js'
import store from './store.js'
import { ContextApi } from './Componat/ContextApi.jsx'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
createRoot(document.getElementById('root')).render(
    <ContextApi>
    <Provider store={store}>
    <App />
    </Provider>
    </ContextApi>
)
