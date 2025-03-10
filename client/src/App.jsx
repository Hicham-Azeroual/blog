import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Singnin from "./pages/Singnin";
import SingnUp from "./pages/SingnUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/FooterC";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/sign-in" element={<Singnin></Singnin>}></Route>
        <Route path="/sign-up" element={<SingnUp></SingnUp>}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
      
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Route>

        <Route element={<OnlyAdminPrivateRoute></OnlyAdminPrivateRoute>}>
      
      <Route path="/create-post" element={<CreatePost></CreatePost>}></Route>
    </Route>
        <Route path="/projects" element={<Projects></Projects>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}
