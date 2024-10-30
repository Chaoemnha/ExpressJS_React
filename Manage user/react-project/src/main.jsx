import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from './routes/root.jsx';
import ErrorPage from './error-page.jsx';
import AboutView from './routes/AboutView.jsx';
import UserView from './routes/UserView';
import HomeView from './routes/HomeView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/about",
        element: <AboutView />,
      },
      {
        path: "/user",
        element: <UserView />,
      },
      {
        path: "/home",
        element: <HomeView />
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
