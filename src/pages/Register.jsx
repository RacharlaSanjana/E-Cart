import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/reducer/authSlice'; // Adjust the import path as necessary
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary

const Register = () => {
  const [u_id, setId] = useState(''); 
  const [u_name, setName] = useState('');
  const [u_pwd, setPassword] = useState('');
  const [u_email, setEmail] = useState('');
  const [u_addr, setAddress] = useState('');
  const [u_contact, setContact] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(register({ u_id, u_name, u_pwd, u_email, u_addr, u_contact }));  // Include u_id in the registration payload
      if (register.fulfilled.match(resultAction)) {
        // Registration successful, navigate to home page
        navigate('/');
      } else {
        // Handle registration failure
        console.error(resultAction.payload);
      }
    } catch (err) {
      // Handle any other errors
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="Id">User ID</label>  {/* Add label for User ID */}
                <input
                  type="text"
                  className="form-control"
                  id="Id"
                  placeholder="Enter Your User ID"
                  value={u_id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="Name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter Your Name"
                  value={u_name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="Email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  value={u_email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  placeholder="Password"
                  value={u_pwd}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="Address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="Address"
                  placeholder="Enter Your Address"
                  value={u_addr}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="Contact">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="Contact"
                  placeholder="Enter Your Contact Number"
                  value={u_contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-underline text-info">
                    Login
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={loading}>
                  Register
                </button>
              </div>
              {error && <p className="text-danger text-center">{error.message || 'Registration failed'}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
