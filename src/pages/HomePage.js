import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage(){
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">SaaS</div>
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/login">Connexion</Link>
          <Link to="/signup">Inscription</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <div className="search">
          <span className="loupe" onClick={()=>setShowSearch(!showSearch)}>🔍</span>
          {showSearch && <input type="text" placeholder="Rechercher..." />}
        </div>
      </header>
      <main>
        <h1>Simulez, détectez et décidez en quelques secondes.</h1>
        <p>Surveillez vos comptes, détectez les fuites, recevez des alertes et suivez votre conformité en un seul endroit.</p>
        <div className="topics">
          <div className="topic">⭐ Valeur<br/>Visibilité claire</div>
          <div className="topic">🔒 Sécurité<br/>Attaques bloquées</div>
          <div className="topic">📜 Conformité<br/>RGPD sans effort</div>
        </div>
      </main>
    </div>
  );
}
export default HomePage;