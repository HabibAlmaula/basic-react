import "./styles/App.css";
import { setDefaultOptions } from "date-fns";
import { id } from "date-fns/locale";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import NotFound from "./pages/base/NotFound";
import AddNote from "./pages/AddNote";
import DetailNote from "./pages/DetailNote";
import { AuthProvider } from "./providers/AuthProvider";
import { RouteGuard } from "./routes/RouteGuard";
import {
  addNote,
  detailNote,
  home,
  login,
  notFound,
  register,
} from "./routes/routes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { AppToast } from "./components/AppToast";
import { AuthGuard } from "./routes/AuthGuard";
import { ThemeProvider } from "./providers/ThemeProvider";

function App() {
  // Set the default locale to Indonesian
  setDefaultOptions({ locale: id });
  return (
    <>
      <ThemeProvider>
        <AppToast />
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path={login}
                element={
                  <AuthGuard>
                    <Login />
                  </AuthGuard>
                }
              />
              <Route
                path={register}
                element={
                  <AuthGuard>
                    <Register />
                  </AuthGuard>
                }
              />
              <Route element={<RouteGuard />}>
                <Route path={home} element={<Home />} />
                <Route path={addNote} element={<AddNote />} />
                <Route path={detailNote} element={<DetailNote />} />
              </Route>
              <Route path={notFound} element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
