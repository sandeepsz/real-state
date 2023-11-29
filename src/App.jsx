import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Header from "./components/Header";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
