import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminViewPage from "./pages/AdminView";
import UserViewPage from "./pages/UserView";
import WebsiteNavbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteNavbar />}>
          <Route index element={<UserViewPage />} />
          <Route path="/admin" element={<AdminViewPage />} />
          <Route path="/user" element={<UserViewPage />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
