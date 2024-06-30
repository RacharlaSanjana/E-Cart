import React from "react";

const Home = () => {
  return (
    <>
      <div
        className="hero border-1 pb-3"
        style={{
          paddingBottom: '3rem',
        }}
      >
        <div
          className="card bg-dark text-white border-0 mx-3"
          style={{
            border: 'none', 
            margin: '0 1rem',
          }}
        >
          <img
            className="card-img img-fluid"
            src="https://www.savaari.com/blog/wp-content/uploads/2024/01/Screenshot-2022-06-02-213419-1.webp"
            alt="Card"
            style={{
              maxHeight: '340px',
              width:'100%',    
              objectFit: 'cover',
            }}
          />
          <div
            className="card-img-overlay d-flex align-items-center"
            style={{
              display: 'flex',     
              alignItems: 'center', 
            }}
          >
            <div
              className="container"
              style={{
                padding: '0 1rem', 
              }}
            >
              <h5>
                <strong
                  style={{
                    display: 'inline-block',
                    transition: 'transform 0.3s ease, color 0.3s ease',
                    color: 'black',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                    e.currentTarget.style.color = 'Black'; // Change color on hover
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.color = 'white'; // Revert color on mouse out
                  }}
                >
                  E-Cart
                </strong>
              </h5>
              <p
                className="card-text fs-5 d-none d-sm-block"
                style={{
                  fontSize: '5 rem',
                   // Font size for the text
                }}
              >
                Transforming shopping into a delightful experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
