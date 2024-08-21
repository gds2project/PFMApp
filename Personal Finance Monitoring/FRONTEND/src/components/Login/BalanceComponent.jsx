import React, { useState, useEffect } from 'react';
import { FaWallet, FaRedo } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Axios_request from '../Axios_request';

const BalanceComponent = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    setLoading(true);
    try {
      const response = await Axios_request("get", "/balance",{});
      setBalance(parseFloat(response.data).toFixed(2));
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="container d-flex align-items-center border rounded bg-light" style={styles.container}>
      <FaWallet className="mr-2" style={styles.icon} />
      <span className="mr-2" style={styles.rupeeSign}>₹</span>
      <span className="mr-2" style={styles.amount}>
        {loading ? (
          <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="sr-only"></span>
            <span className="sr-only"></span>
          </div>
        ) : (
          balance
        )}
      </span>
      <FaRedo
        className="ml-2"
        style={styles.refreshIcon}
        onClick={fetchBalance}
        title="Refresh Balance"
      />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '150px',
    margin: '0 auto',
  },
  icon: {
    fontSize: '15px',
  },
  rupeeSign: {
    fontSize: '15px',
  },
  amount: {
    fontSize: '15px',
  },
  refreshIcon: {
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
};

export default BalanceComponent;
