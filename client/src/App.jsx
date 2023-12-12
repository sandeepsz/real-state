import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Forgotpassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";
import CreateListing from "./pages/CreateListing";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/update-password" element={<Forgotpassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/creating-listing" element={<CreateListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
