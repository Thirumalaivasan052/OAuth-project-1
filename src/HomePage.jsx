// import React from "react";
// import "./HomePage.css";

// function HomePage() {
//   const loginWithGoogle = () => {
//     // Redirect to backend OAuth Google login URL
//     window.location.href = "http://localhost:8080/oauth2/authorization/google?prompt=select_account";
//   };

//   return (
//     <div className="app-container">
//       <h1>Google OAuth Login</h1>
//       <p>Click below to login with Google:</p>
//       <button onClick={loginWithGoogle} className="google-login-btn">
//         Continue with Google
//       </button>
//     </div>
//   );
// }

// export default HomePage;




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
        }, 500); // slight delay for session cookie
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
        window.location.href =
            "http://localhost:8080/oauth2/authorization/google?prompt=select_account";
    };

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:8080/logout", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok || response.status === 200) {
                setUser(null);
                window.location.href = "/";
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
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
                    <a href="http://localhost:8080/logout" className="logout-btn"><button>Logout</button></a>


                </div>
            )}
        </div>
    );
}

export default App;
