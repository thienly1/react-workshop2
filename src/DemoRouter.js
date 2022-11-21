import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import CrudDemo from "./CrudDemo";
import PersonDetails from "./PersonDetails";

const DemoRouter = () => {
  return (
    <div>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="home" element={<Home />} />
        <Route path="person" element={<Person />} />
        <Route path="about" element={<About />} />
        <Route path="crud" element={<CrudDemo />} />
        <Route path="details/:id" element={<PersonDetails/>} />
        <Route path="error" element={<NotFound />} />
        <Route path="*" element={<Navigate to={"/error"} />} /> {/*All other paths will show Error page */}
      </Routes>
    </Router>
    </div>
  );
}


const Welcome = () => {
  return <h2>Welcome to Webpage</h2>;
};
const About = () => {
  return <h2>About page</h2>;
};
const Home = () => {
  return <h2>Home Page</h2>;
};
const Person = () => {
  return <h2>Person Page</h2>;
};
const NotFound = () => {
  return <h2>Page Not Found</h2>;
};

const Header = () => {
  return (
    <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <Link to={'/'} className='d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none'>Welcome</Link>
      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li className="nav-item">
          <Link className="nav-link" to="home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="person">
            Person
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="crud">
             CRUD
          </Link>
        </li>
      </ul>
      <div className="col-md-3 text-end">
        <Link to={'/login'} className='btn btn-outline-primary me-2 disabled'>Login</Link>
        <Link to={'/signup'} className='btn btn-primary disabled'>Sign-up</Link>
      </div>
    </nav>
  );
};

export default DemoRouter;
