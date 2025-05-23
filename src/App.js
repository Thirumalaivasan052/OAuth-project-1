// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");

    if (error) {
      console.error("OAuth error:", error);
      window.location.href = "/";
      return;
    }

    setTimeout(() => {
      fetchUserData();
    }, 100); // ✅ 100ms delay to ensure session cookie readiness
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/user", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    // ✅ fixed: use replace to prevent session flicker (1-sec error)
    window.location.replace(
      "http://localhost:8080/oauth2/authorization/google?prompt=select_account"
    );
  };

  const logout = () => {
    fetch("http://localhost:8080/logout", {
      method: "GET", // must be GET for Spring Boot logout
      credentials: "include",
    })
      .then(() => {
        setUser(null);
        window.location.href = "/";
      })
      .catch((err) => {
        console.error("Logout failed", err);
      });
  };

  if (loading) {
    return <div className="app-container">Loading...</div>;
  }

  return (
    <div className="app-container">
      <h1>Google OAuth Login</h1>

      {!user ? (
        <>
          <p>Click below to login with Google:</p>
          <button onClick={loginWithGoogle} className="google-login-btn">
            Continue with Google
          </button>
        </>
      ) : (
        <div className="profile-card">
          <img src={user.picture} alt="Profile" className="profile-img" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>

          {/* ✅ optional: use button for logout */}
          {/* <button onClick={logout} className="logout-btn">Logout</button> */}

          {/* OR ✅ use anchor method */}
          <a href="http://localhost:8080/logout" className="logout-btn">
            <button>Logout</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;             //  main running 



// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./HomePage";
// import ProfilePage from "./ProfilePage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/profile" element={<ProfilePage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;






// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if we're returning from OAuth flow
//     const urlParams = new URLSearchParams(window.location.search);
//     const error = urlParams.get('error');
    
//     if (error) {
//       console.error('OAuth error:', error);
//       window.location.href = '/'; // Redirect to home on error
//       return;
//     }

//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/user", {
//         credentials: "include",
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         setUser(data);
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loginWithGoogle = () => {
//     // Clear any existing session before new login
//     fetch("http://localhost:8080/logout", {
//       method: "POST",
//       credentials: "include",
//     }).finally(() => {
//       window.location.href = "http://localhost:8080/oauth2/authorization/google";
//     });
//   };

//   const logout = () => {
//     fetch("http://localhost:8080/logout", {
//       method: "POST",
//       credentials: "include",
//     }).then(() => {
//       setUser(null);
//       window.location.href = "/";
//     });
//   };

//   if (loading) {
//     return <div className="app-container">Loading...</div>;
//   }

//   return (
//     <div className="app-container">
//       <h1>Google OAuth Login</h1>

//       {!user ? (
//         <>
//           <p>Click below to login with Google:</p>
//           <button onClick={loginWithGoogle} className="google-login-btn">
//             Continue with Google
//           </button>
//         </>
//       ) : (
//         <div className="profile-card">
//           <img src={user.picture} alt="Profile" className="profile-img" />
//           <h2>{user.name}</h2>
//           <p>{user.email}</p>
//           <button onClick={logout} className="logout-btn">
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
