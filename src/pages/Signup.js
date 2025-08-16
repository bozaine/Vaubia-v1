import React from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(){
  const navigate = useNavigate();
  const handleSignup=()=>{navigate('/pricing');};

  return (<div>
    <h2>Inscription</h2>
    <input placeholder="Email" />
    <input placeholder="Mot de passe" type="password" />
    <button onClick={handleSignup}>Créer un compte</button>
  </div>);
}
export default Signup;