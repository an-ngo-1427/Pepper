import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
const queryClient = new QueryClient()
import Cookies from 'js-cookie'
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './Components/Session/SignUpPage.jsx'
import { restoreCSRF, csrfFetch } from '../csurf.js'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UserProfile from './Components/Session/UserProfile.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import LogInPage from './Components/Session/LogInPage.jsx'
import { getUser } from './QueryHelpers/sessionQuery.js'
import AppointmentPage from './Components/Appointment/AppointmentPage.jsx'
import OwnerAppointments from './Components/Appointment/OwnerAppointment.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Navbar from './NavBar.jsx'

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  // window.store = store;
}

// const router = createBrowserRouter([
//   {
//     path:'/schedule',
//     element:<OwnerAppointments/>
//   },
//   {
//     path:"/reservation",
//     element:<AppointmentPage />
//   },
//   {
//     path: "/signup",
//     element: <SignUp/>
//   },
//   {
//     path:"/login",
//     element:<LogInPage/>
//   },
//   {
//     path:"/profile",
//     element:<UserProfile />
//   },
//   {
//     path:'/',
//     element:<LandingPage/>
//   },
// ]);
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>

    </QueryClientProvider>
  </StrictMode>,
)
