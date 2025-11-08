import { BrowserRouter, Routes, Route } from "react-router-dom";
import Id from "./component/Id";
import Sid from "./component/Sid";
import Dr from "./component/Dr";
import Cr from "./component/Cr";
// import Uid from "./component/Uid";
// import Dr from "./component/Dr"; // not used

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cr />} />
        <Route path="/ge" element={<Id />} />
        <Route path="/ge/:id" element={<Sid />} />
        <Route path="/ge/su" element={<Dr />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Create from "./components/Create";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
