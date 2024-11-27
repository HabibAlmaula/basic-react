import "./styles/App.css";
import { setDefaultOptions } from "date-fns";
import { id } from "date-fns/locale";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/base/NotFound";
import AddNote from "./pages/AddNote";
import DetailNote from "./pages/DetailNote";
import { AuthProvider } from "./hooks/AuthProvider";
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

function App() {
  // Set the default locale to Indonesian
  setDefaultOptions({ locale: id });
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path={login} element={<Login />} />
            <Route path={register} element={<Register />} />
            <Route element={<RouteGuard />}>
              <Route path={home} element={<Home />} />
              <Route path={addNote} element={<AddNote />} />
              <Route path={detailNote} element={<DetailNote />} />
            </Route>
            <Route path={notFound} element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
