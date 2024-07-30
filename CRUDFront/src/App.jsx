
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import DataForm from "./components/DataForm";
import UserList from "./components/UserList";

export const App = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <UserList/> } />
      <Route path="/create" element={<DataForm/>} />
      <Route path="/read/:id" element={<DataForm/>} />
      <Route path="/edit/:id" element={<DataForm/>} />
    </Routes>
  </BrowserRouter>
  );
};