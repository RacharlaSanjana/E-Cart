import React, { useEffect } from "react";
import { Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { fetchCart, incrementItemQuantity, decrementItemQuantity, deleteItemFromCart } from "../redux/action/cart";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user));
    }
  }, [dispatch, user]);

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">Your Cart is Empty</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const addItem = (product) => {
    dispatch(incrementItemQuantity(user, product.p_id));
  };

  const removeItem = (product) => {
    dispatch(decrementItemQuantity(user, product.p_id));
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.p_cost * item.qty;
      totalItems += item.qty;
    });

    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {state.map((item) => (
                      <div key={item.p_id}>
                        <div className="row d-flex align-items-center">
                          <div className="col-lg-3 col-md-12">
                            <div className="bg-image rounded">
                              <img
                                src={item.p_img}
                                alt={item.p_name}
                                width={100}
                                height={75}
                              />
                            </div>
                          </div>
                          <div className="col-lg-5 col-md-6">
                            <p>
                              <strong>{item.p_name}</strong>
                            </p>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                              <button
                                className="btn px-3"
                                onClick={() => removeItem(item)}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <p className="mx-5">{item.qty}</p>
                              <button
                                className="btn px-3"
                                onClick={() => addItem(item)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            <p className="text-start text-md-center">
                              <strong>
                                <span className="text-muted">{item.qty}</span> x ₹{item.p_cost}
                              </strong>
                            </p>
                          </div>
                        </div>
                        <hr className="my-4" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})<span>₹{Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>₹{shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>₹{Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>
                    <Link to="/checkout" className="btn btn-dark btn-lg btn-block">
                      Go to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
    </>
  );
};

export default Cart;
