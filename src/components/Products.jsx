import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../redux/action/cart";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addProduct = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const cartItem = {
      p_id: product.p_id,
      p_img: product.p_img,
      p_cost: product.p_cost,
      qty: 1,
      u_name: user,
    };
    dispatch(addItemToCart(cartItem));
  };

  const buyNow = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const cartItem = {
      p_id: product.p_id,
      p_img: product.p_img,
      p_cost: product.p_cost,
      qty: 1,
      u_name: user,
    };
    dispatch(addItemToCart(cartItem));
    navigate("/cart");
  };

  useEffect(() => {
    let componentMounted = true;

    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://miniprj-qqee.onrender.com/fetch");
        if (componentMounted) {
          const products = await response.json();
          setData(products);
          setFilter(products);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => (
    <>
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
      </div>
      {Array(6).fill().map((_, index) => (
        <div key={index} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      ))}
    </>
  );

  const categoryKeywords = {
    electronics: ["mobiles", "earphones", "tv", "bluetooth"],
  };

  const filterProduct = (category) => {
    const keywords = categoryKeywords[category] || [];
    const updatedList = data.filter((item) =>
      keywords.includes(item.p_cat.toLowerCase())
    );
    setFilter(updatedList);
  };

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-5">
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => setFilter(data)}
        >
          All
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("electronics")}
        >
          Electronics
        </button>
      </div>
      {filter.map((product) => (
        <div
          key={product.p_id}
          className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
        >
          <div className="card text-center h-100">
            <img
              src={product.p_img}
              alt="product"
              className="card-img-top"
              style={{
                maxHeight: "150px",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">
                {product.p_name.substring(0, 20)}...
              </h5>
              <p className="card-text">
                {product.p_desc.substring(0, 90)}...
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item lead bold">
                <b>₹ {product.p_cost}</b>
              </li>
            </ul>
            <div className="card-body">
              <button
                className={`btn btn-dark m-1 ${!user ? 'disabled' : ''}`}
                onClick={() => buyNow(product)}
                disabled={!user}
              >
                Buy Now
              </button>
              <button
                className={`btn btn-dark m-1 ${user == null ? 'disabled' : ''}`}
                onClick={() => addProduct(product)}
                disabled={!user}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
