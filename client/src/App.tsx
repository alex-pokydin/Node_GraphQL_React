import { BrowserRouter, Routes, Route } from "react-router";

import AuthPage from "./pages/AuthPage.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import BookingsPage from "./pages/BookingsPage.tsx";
import Navigation from "./components/Navigation/Navigation.tsx";

import "./App.css";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
