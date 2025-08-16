
import React from "react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Bienvenue dans le Dashboard</h1>
      <p>Utilisateur connecté : {user?.email}</p>
    </div>
  );
}
