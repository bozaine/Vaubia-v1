import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){
  const [id,setId] = useState('');
  const [pw,setPw] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const handleLogin=()=>{
    if(id==='admin' && pw==='admin'){
      localStorage.setItem('auth','true');
      navigate('/dashboard');
    } else {
      setError('Identifiants invalides');
    }
  };

  return (<div>
    <h2>Connexion</h2>
    <input placeholder="Identifiant" value={id} onChange={e=>setId(e.target.value)} />
    <input placeholder="Mot de passe" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
    <button onClick={handleLogin}>Se connecter</button>
    {error && <p style={{color:'red'}}>{error}</p>}
  </div>);
}
export default Login;