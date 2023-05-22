import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";
import Loading from "./components/Loading/Loading";
import { useMediaQuery } from "react-responsive";
const Navbar = React.lazy(() => import("./components/Navigation/Navbar"));
const MenuAppBar = React.lazy(
  () => import("./components/Navigation/MenuAppBar")
);
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Cities = React.lazy(() => import("./pages/Cities"));

function App() {
  const { state: userValue } = useAuthContext();

  const isDesktop = useMediaQuery({ query: "(min-width: 821px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 820px)" });

  return (
    <div className="App">
      <BrowserRouter>
        <React.Suspense fallback={<Loading />}>
          {isDesktop && <Navbar />}
          {isMobile && <MenuAppBar />}
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={userValue.user ? <Home /> : <Navigate to="/login" />}
              />
            </Routes>
            <Routes>
              <Route
                path="/login"
                element={!userValue.user ? <Login /> : <Navigate to="/" />}
              />
            </Routes>
            <Routes>
              <Route
                path="/signup"
                element={!userValue.user ? <Signup /> : <Navigate to="/" />}
              />
            </Routes>
            <Routes>
              <Route
                path="/cities"
                element={userValue.user ? <Cities /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
