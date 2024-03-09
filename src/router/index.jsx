import { createBrowserRouter } from "react-router-dom";
import {Login,Regristar} from '../auth'
import { LayoutPrivate } from "../layout/pages/LayoutPrivate";
import { EmpleadoPage } from "../RecursosHumanos/pages/EmpleadoPage";
import { DepartamentoPage } from "../RecursosHumanos/pages/DepartamentoPage";
import { EditarEmpleadoPage } from "../RecursosHumanos/pages/EditarEmpleadoPage";
import { AgregarEmpleadoPage } from "../RecursosHumanos/pages/AgregarEmpleadoPage";
import {VacacionesPage} from '../RecursosHumanos/pages/accionesEmpleados/VacacionesPage'
import { PermisoPage } from "../RecursosHumanos/pages/accionesEmpleados/PermisoPage";
import { IncapacidadPage } from "../RecursosHumanos/pages/accionesEmpleados/IncapacidadPage";
import { DiaEconomicoPage } from "../RecursosHumanos/pages/accionesEmpleados/DiaEconomicoPage";
import { FormacionPage } from "../RecursosHumanos/pages/accionesEmpleados/FormacionPage";


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
        { 
            path:'departamentos',
            element:<DepartamentoPage/>
        },
        { 
            path:'personal',
            element:<EmpleadoPage/>
        },
        { 
            path:'editar/:cl',
            element:<EditarEmpleadoPage/>
        },
        { 
            path:'agregar',
            element:<AgregarEmpleadoPage/>
        },
        { 
            path:'vacaciones/:cl',
            element:<VacacionesPage/>
        },
        { 
            path:'permiso/:cl',
            element:<PermisoPage/>
        },
        { 
            path:'incapacidad/:cl',
            element:<IncapacidadPage/>
        },
        { 
            path:'dia/:cl',
            element:<DiaEconomicoPage/>
        },
        { 
            path:'formacion/:cl',
            element:<FormacionPage/>
        },
    
    ]
    },
])