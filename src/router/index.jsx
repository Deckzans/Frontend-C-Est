import { createBrowserRouter } from "react-router-dom";
import {Login,Regristar} from '../auth'
import { LayoutPrivate } from "../layout/pages/LayoutPrivate";
import { EmpleadoPage } from "../RecursosHumanos/pages/EmpleadoPage";
import { DepartamentoPage } from "../RecursosHumanos/pages/DepartamentoPage";

export const router = createBrowserRouter([ 
    { 
        path:'/',
        element:<Login/>,
    },
    { 
        path:'/registro',
        element:<Regristar/>,
    },
    {
        path: '/home',
        element: <LayoutPrivate/>,
        children: [ { 
            index: true,
            element: <EmpleadoPage />,
        },
    
    ]
    },

    { 
        path:'/departamentos',
        element:<DepartamentoPage/>,
    },
])