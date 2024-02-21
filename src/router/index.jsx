import { createBrowserRouter } from "react-router-dom";
import {App} from '../App'
import {Login} from '../auth/pages/Login'
import {Regristar} from '../auth/pages/Registrar'
import {BarraMenu} from '../layout/Components/BarraMenu'

export const router = createBrowserRouter([ 
    { 
        path:'/',
        element:<App/>
    },
    { 
        path:'/login',
        element:<Login/>,
    },
    { 
        path:'/registrar',
        element:<Regristar/>,
    },
    {
        path: '/navbar',
        element: <BarraMenu/>,
    },
])