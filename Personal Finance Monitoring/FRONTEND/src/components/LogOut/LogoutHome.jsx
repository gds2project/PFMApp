import React from 'react';

const LogoutHome = () => {
  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f5f5f5',
  };

  const carouselImageStyle = {
    maxHeight: '450px', // Ensure images fit within the carousel
  };

  return (
    <div className="container mt-4" style={containerStyle}>
      {/* Carousel */}
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={require("../../Assets/Images/Corousel/1.png")} className="d-block w-100" alt="Arise" style={carouselImageStyle} />
            <div className="carousel-caption d-none d-md-block">
              
              {/* <p>Arise - A Call To Believers</p> */}
            </div>
          </div>
          <div className="carousel-item">
            <img src={require("../../Assets/Images/Corousel/2.png")} className="d-block w-100" alt="Gym Equipments" style={carouselImageStyle} />
            <div className="carousel-caption d-none d-md-block">
              
              <p>Investment Distribution</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={require("../../Assets/Images/Corousel/3.png")} className="d-block w-100" alt="Toys" style={carouselImageStyle} />
            <div className="carousel-caption d-none d-md-block">
              
            </div>
          </div>
          <div className="carousel-item">
            <img src={require("../../Assets/Images/Corousel/4.png")} className="d-block w-100" alt="Cameras" style={carouselImageStyle} />
            <div className="carousel-caption d-none d-md-block">
              
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* About Section */}
      <div className="card mb-4">
        <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={require('../../Assets/Images/Arise_Logo.jpg')}
                alt="Logo"
                width="60" // Increased size
                height="48" // Increased size
                className="d-inline-block align-text-top"
                style={{ marginRight: '10px' }} // Add space between logo and text
              />
              <h2 style={{ margin: 0 }}>Arise - A Call To Believers</h2>
            </div>
        </div>
        <div className="card-body">
          <h3>Welcome You All To Track Your Personal Finance</h3>
          <p>
            Money Manager is a comprehensive financial management application designed to help you take control of your personal finances. Our platform provides tools for tracking expenses, planning budgets, monitoring investments, and generating insightful reports.
          </p>
          <h4>Key Features</h4>
          <ul>
            <li><strong>Expense Tracking:</strong> Monitor and categorize your spending to gain better control over your finances.</li>
            <li><strong>Budget Management:</strong> Set budgets and track your spending against your financial goals.</li>
            <li><strong>Investment Tracking:</strong> Keep track of your investments and review their performance.</li>
            <li><strong>Financial Reports:</strong> Access detailed reports to understand and improve your financial health.</li>
          </ul>
        </div>
      </div>

      {/* Cards Section */}
      <div className="row">
        {/* Populated Cards */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src={require("../../Assets/Images/Cards/1.png")} className="card-img-top" alt="Expense Tracking" />
            <div className="card-body">
              <h5 className="card-title">Expense Tracking</h5>
              <p className="card-text">Track and categorize your daily expenses effortlessly.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src={require("../../Assets/Images/Cards/2.png")} className="card-img-top" alt="Budget Management" />
            <div className="card-body">
              <h5 className="card-title">Budget Management</h5>
              <p className="card-text">Create and manage budgets to stay within your financial limits.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src={require("../../Assets/Images/Cards/3.png")} className="card-img-top" alt="Investment Tracking" />
            <div className="card-body">
              <h5 className="card-title">Investment Tracking</h5>
              <p className="card-text">Monitor your investments and their performance over time.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <img src={require("../../Assets/Images/Cards/4.png")} className="card-img-top" alt="Financial Reports" />
            <div className="card-body">
              <h5 className="card-title">Financial Reports</h5>
              <p className="card-text">Generate reports to analyze and improve your financial health.</p>
            </div>
          </div>
        </div>
        {/* Empty Cards */}
        <div className="col-md-3 mb-4">
          <div className="card border-secondary">
            <div className="card-body text-center">
              <h5 className="card-title">Split Group</h5>
              <p className="card-text">This feature is coming soon. Stay tuned!</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card border-secondary">
            <div className="card-body text-center">
              <h5 className="card-title">Payment Gateway</h5>
              <p className="card-text">This feature is coming soon. Stay tuned!</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card border-secondary">
            <div className="card-body text-center">
              <h5 className="card-title">Group Additions</h5>
              <p className="card-text">This feature is coming soon. Stay tuned!</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card border-secondary">
            <div className="card-body text-center">
              <h5 className="card-title">Fetch Stock price</h5>
              <p className="card-text">This feature is coming soon. Stay tuned!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutHome;