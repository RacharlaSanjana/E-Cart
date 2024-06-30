import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducer/authSlice'; // Update the import path as necessary
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components';

const Login = () => {
  const [u_name, setUName] = useState('');
  const [u_pwd, setUpwd] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add this line to use the navigate function
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ u_name, u_pwd }))
      .unwrap() // Unwrap the action payload to get the response data
      .then(() => {
        // If login is successful, navigate to the home page
        navigate('/');
      })
      .catch((err) => {
        // Handle error (already handled by state and displayed as a message)
        console.error('Login failed:', err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="floatingInput">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Your username"
                  value={u_name}
                  onChange={(e) => setUName(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={u_pwd}
                  onChange={(e) => setUpwd(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>
                  New Here?{' '}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={loading}>
                  Login
                </button>
              </div>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">Error: {error}</p>}
            {user && <p>Welcome, {user}</p>} {/* Display `user.u_name` */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
