import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

import "./style.scss"

import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/utama/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Simpan from "./pages/Simpan";
import Clock from "./pages/utama/RealTime";
import Card from "./pages/utama/Card";



const Layout = () => {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/simpan",
    element: <Simpan />,
  },
  {
    path: "/realtime",
    element: <Clock />,
  },
  {
    path: "/card",
    element: <Card />,
  },
]);

function App() {
  return (
    <div className="app">
      
        <RouterProvider router={router} />
      </div>
   
  );
}

export default App;
