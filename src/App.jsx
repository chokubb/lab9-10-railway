import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import MyTickets from "./pages/MyTickets";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking/:trainId" element={<Booking />} />
      <Route path="/tickets" element={<MyTickets />} />
    </Routes>
  );
}

export default App;