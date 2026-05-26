import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './assets/octofitapp-small.svg';
import './App.css';

function Home() {
  return (
    <div className="card shadow-sm card-custom">
      <div className="card-body">
        <h1 className="h3 mb-3">OctoFit Tracker</h1>
        <p className="lead mb-2">
          Explore the backend REST API data from a polished React frontend using Bootstrap.
        </p>
        <p className="text-muted mb-0">
          Navigate between Activities, Leaderboard, Teams, Users, and Workouts to view the data returned by your Django API.
        </p>
      </div>
    </div>
  );
}

function App() {
  const navClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <div className="App container py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-4">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center fw-bold" to="/">
            <img src={logo} alt="OctoFit logo" className="app-logo me-2" />
            <span className="brand-title">OctoFit Tracker</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={navClass} to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/workouts">
                  Workouts
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
