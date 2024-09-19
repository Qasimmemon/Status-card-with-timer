import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserStatusCard = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [creationTime, setCreationTime] = useState(null);

  useEffect(() => {
    let hideTimeout;

    if (creationTime) {
      // Hide the card after 10 minutes (600,000 milliseconds)
      hideTimeout = setTimeout(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.creationTime !== creationTime)
        );
      }, 600000); // 10 minutes
    }

    return () => clearTimeout(hideTimeout);
  }, [creationTime]);

  const handleCreateUser = () => {
    if (!userName.trim()) {
      // Show toast notification if input is empty
      toast.error('Please Fill All Instruction!');
      return;
    }

    const newCreationTime = new Date();
    setUsers([...users, { name: userName, creationTime: newCreationTime }]);
    setUserName('');
    setCreationTime(newCreationTime);
  };

  const handleDeleteUser = (creationTime) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.creationTime !== creationTime)
    );
  };

  const getElapsedTime = (creationTime) => {
    const now = new Date();
    const elapsed = Math.floor((now - new Date(creationTime)) / 1000); // Elapsed time in seconds
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatCreationTime = (creationTime) => {
    const date = new Date(creationTime);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toDateString(undefined, options); // Formats the creation date with day, month, date, and year
  };

  return (
    <div style={{ marginLeft: '500px' }}>
      <div style={styles.form}>
        <div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name"
          />
          <button onClick={handleCreateUser}>Create User</button>
        </div>
      </div>
      {users.map((user, index) => (
        <div key={index} style={styles.card}>
          <div className="flex flex-col items-center pb-10">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Status Card
            </h5>
            <br />
            <span className="text-m text-gray-700 dark:text-gray-400">
              <p>Name: {user.name}</p>
            </span>
            <span className="text-m text-gray-700 dark:text-gray-400">
              <p>Time Elapsed: {getElapsedTime(user.creationTime)}</p>
            </span>
            <span className="text-m text-gray-700 dark:text-gray-400">
              <p>Created On: {formatCreationTime(user.creationTime)}</p>
            </span>
            <span className="text-m text-gray-700 dark:text-gray-400">
              <button onClick={() => handleDeleteUser(user.creationTime)} style={{ color: 'white', backgroundColor: 'red' }}>
                Delete
              </button>
            </span>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

const styles = {
  form: {
    marginBottom: '20px',
  },
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    position: 'relative',
  },
  deleteButton: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default UserStatusCard;
