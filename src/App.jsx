import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  // Theme state
  const [theme, setTheme] = useState('light');

  // User status card states
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [creationTime, setCreationTime] = useState(null);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Apply the theme to the body class
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Handle user creation
  useEffect(() => {
    let hideTimeout;

    if (creationTime) {
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
      toast.error('Please Fill All Instructions!');
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
    return date.toDateString(); // Formats the creation date with day, month, date, and year
  };

  return (
    <div className={`app ${theme}`} style={{ marginLeft: '500px' }}>
      {/* Theme Toggle Button */}
      <button onClick={toggleTheme} style={{ color: 'red' }}>
        Click to {theme === 'light' ? 'dark' : 'light'} mode
      </button>

      {/* User Status Card Form */}
      <div style={styles.form}>
        <div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name"
            style={{
              color: theme === 'dark' ? 'black' : 'black', // Conditionally apply text color
            }}
          />
          <button style={{
              color: theme === 'dark' ? 'black' : 'black', // Conditionally apply text color
            }} onClick={handleCreateUser}>Create User</button>
        </div>
      </div>

      {/* User Cards */}
      {users.map((user, index) => (
        <div key={index} style={styles.card}>
          <div className="flex flex-col items-center pb-10">
            <h5
              className="mb-1 text-xl font-medium"
              style={{ color: theme === 'dark' ? 'white' : 'black' }} // Conditionally apply text color
            >
              Status Card
            </h5>
            <br />
            <span
              className="text-m"
              style={{ color: theme === 'dark' ? 'white' : 'black' }} // Conditionally apply text color
            >
              <p>Name: {user.name}</p>
            </span>
            <span
              className="text-m"
              style={{ color: theme === 'dark' ? 'white' : 'black' }} // Conditionally apply text color
            >
              <p>Time Elapsed: {getElapsedTime(user.creationTime)}</p>
            </span>
            <span
              className="text-m"
              style={{ color: theme === 'dark' ? 'white' : 'black' }} // Conditionally apply text color
            >
              <p>Created On: {formatCreationTime(user.creationTime)}</p>
            </span>
            <span
              className="text-m"
              style={{ color: theme === 'dark' ? 'white' : 'black' }} // Conditionally apply text color
            >
              <button
                onClick={() => handleDeleteUser(user.creationTime)}
                style={{ color: 'white', backgroundColor: 'red' }}
              >
                Delete
              </button>
            </span>
          </div>
        </div>
      ))}

      <ToastContainer />
    </div>
  );
}

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
};

export default App;
