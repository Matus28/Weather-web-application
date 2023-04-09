import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";
import Loading from "./components/Loading/Loading";
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Cities = React.lazy(() => import("./pages/Cities"));

function App() {
  const { state: userValue } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <React.Suspense fallback={<Loading />}>
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
          </React.Suspense>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
