import { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalState';

const GoogleLoginComponent = () => {
  const { isAuthenticated, user, login, logout } = useContext(GlobalContext);

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/google/', {
        credential: credentialResponse.credential
      });
      login(response.data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex items-center gap-4">
      {!isAuthenticated ? (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">
            Hello, {user.first_name}!
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginComponent;