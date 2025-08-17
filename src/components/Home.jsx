import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="min-vh-100 bg-gradient-primary d-flex align-items-center">
      <div className="container-fluid px-0">
        <div className="row g-0 min-vh-100">
          <div className="col-12">
            <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 px-4">
              {/* Welcome Section */}
              <div className="text-center text-white mb-5">
                <h1 className="display-1 fw-bold mb-4">
                  <i className="bi bi-currency-exchange me-3"></i>
                  Welcome to Finance Tracker
                </h1>
                <p className="lead fs-2 mb-4">
                  Your personal finance management companion
                </p>
                <p
                  className="text-center fs-4 mb-5 mx-auto"
                  style={{ maxWidth: "800px" }}
                >
                  Track your income, expenses, and financial goals all in one place.
                  Get insights into your spending habits and make smarter financial decisions.
                </p>

              </div>

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .hover-scale {
          transition: transform 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
        .text-white-50 {
          color: rgba(255, 255, 255, 0.7) !important;
        }
      `}</style>
    </div>
  );
};

export default Home;
