import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard(){
  return (<div style={{padding:20}}>
    <h2>Tableau de bord</h2>
    <p>Tentatives détectées: 12</p>
    <p>Attaques bloquées: 8</p>
    <p>Score sécurité: 92%</p>
    <Link to="/settings">Réglages</Link>
  </div>);
}
export default Dashboard;