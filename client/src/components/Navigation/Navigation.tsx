import { NavLink } from "react-router";
import "./Navigation.css";

export default function Navigation() {
  return (
    <header className="main-nav">
      <div className="logo">
        <h1>Event Booking App</h1>
      </div>
      <nav className="main-nav__items">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Auth</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}