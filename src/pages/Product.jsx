import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams,useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/action/cart";
import { Navbar } from "../components";

const Product = () => {
  const { p_id } = useParams();
  const [product, setProduct] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://apimern-wefm.onrender.com/product/${p_id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching product details.");
        setLoading(false);
      }
    };
    getProduct();
  }, [p_id]);

  useEffect(() => {
    let componentMounted = true;

    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://miniprj-qqee.onrender.com/fetch");
        if (componentMounted) {
          const products = await response.json();
          setData(products);
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
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} width={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={40} width={70} />
          <Skeleton height={50} width={110} />
          <Skeleton height={120} />
          <Skeleton height={40} width={110} inline={true} />
          <Skeleton className="mx-3" height={40} width={110} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <img
            className="img-fluid"
            src={product.p_img}
            alt={product.p_name}
            width="400px"
            height="400px"
          />
        </div>
        <div className="col-md-6 py-5">
          <h4 className="text-uppercase text-muted">{product.p_cat}</h4>
          <h1 className="display-5">{product.p_name}</h1>
          <h3 className="display-6 my-4">₹{product.p_cost}</h3>
          <p className="lead">{product.p_desc}</p>
          <button className="btn btn-outline-dark" onClick={() => addProduct(product)}>
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-dark mx-3">
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );

  const LoadingSimilar = () => (
    <div className="my-4 py-4">
      <div className="d-flex">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
        ))}
      </div>
    </div>
  );

  const ShowSimilarProduct = () => (
    <div className="py-4 my-4">
      <div className="d-flex">
        {data.slice(0, 4).map((item) => (
          <div key={item.p_id} className="card mx-4 text-center">
            <img
              className="card-img-top p-3"
              src={item.p_img}
              alt={item.p_name}
              height={300}
              width={300}
            />
            <div className="card-body">
              <h5 className="card-title">{item.p_name.substring(0, 15)}...</h5>
            </div>
            <div className="card-body">
              <Link to={`/product/${item.p_id}`} className="btn btn-dark m-1">
                Buy Now
              </Link>
              <button className="btn btn-dark m-1" onClick={() => addProduct(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {loading ? <Loading /> : error ? <p>{error}</p> : <ShowProduct />}
        </div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2>You may also Like</h2>
            <Marquee pauseOnHover pauseOnClick speed={50}>
              {loading ? <LoadingSimilar /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
