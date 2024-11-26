import "./styles/App.css";
import { setDefaultOptions } from "date-fns";
import { id } from "date-fns/locale";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/base/NotFound";
import AddNote from "./pages/AddNote";
import DetailNote from "./pages/DetailNote";

function App() {
  // Set the default locale to Indonesian
  setDefaultOptions({ locale: id });
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/detail/:id" element={<DetailNote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
