import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
function HomePage({isAuthenticated}) {
    const location = useLocation();
    const username = location.state?.username;
    const [seconds, setSeconds] = useState(60);
    useEffect(() => {
      // Get the stored expiry time from localStorage
      const storedExpiryTime = localStorage.getItem('tokenExpiryTime');
      
      if (storedExpiryTime) {
        const now = Date.now();
        const remainingTime = Math.floor((storedExpiryTime - now) / 1000);
  
        if (remainingTime > 0) {
          setSeconds(remainingTime);
        } else {
          // Token has expired, handle it (e.g., redirect to login)
          handleTokenExpiration();
          return;
        }
      } else {
        const expiryTime = Date.now() + 60000; // 60 seconds from now
        localStorage.setItem('tokenExpiryTime', expiryTime);
        setSeconds(60);
      }
  
      const countdown = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 1) {
            return prevSeconds - 1;
          } else {
            clearInterval(countdown);
            // Handle token expiration when the countdown reaches 0
            handleTokenExpiration();
            return 0;
          }
        });
      }, 1000);
  
      return () => clearInterval(countdown);
    }, []);
  
    const handleTokenExpiration = () => {
      // Redirect to login or refresh token
      localStorage.removeItem('tokenExpiryTime');
      window.location.href = '/login';
    };
    return (
        <div>
           {
            isAuthenticated?<div>
                <h2>Welcome {username}, You Logged In Successfully!</h2>
                <div className="timer-container">
      <h1>Token Expires in: {seconds} Seconds</h1>
    </div>
            </div>:<div>
                <h2>Hello, to Continue Please <a href='/login'>Login</a></h2>
            </div>
           }
        </div>
    );
}

export default HomePage;
