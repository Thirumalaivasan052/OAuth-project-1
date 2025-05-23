// import React, { useEffect, useState } from "react";
// import "./ProfilePage.css";

// function ProfilePage() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:8080/user", { credentials: "include" })
//       .then((res) => {
//         if (res.ok) return res.json();
//         throw new Error("Not authenticated");
//       })
//       .then((data) => setUser(data))
//       .catch(() => setUser(null));
//   }, []);

//   if (!user) return <p>Loading user info...</p>;

//   return (
//     <div className="profile-card animate-fadein">
//       <img src={user.picture} alt="Avatar" />
//       <h2>Welcome, {user.name} 👋</h2>
//       <p>{user.email}</p>
//       <p style={{ color: "green", marginTop: "10px" }}>✅ Thanks for logging in!</p>
//     </div>
//   );
// }

// export default ProfilePage;
