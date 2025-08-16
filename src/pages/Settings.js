import React, { useState } from 'react';

function Settings(){
  const [dark,setDark]=useState(true);
  const toggleTheme=()=>setDark(!dark);

  return (<div style={{padding:20}}>
    <h2>Réglages</h2>
    <p>Nom: Admin</p>
    <p>Email: admin@saas.com</p>
    <button onClick={toggleTheme}>{dark ? 'Mode clair' : 'Mode sombre'}</button>
  </div>);
}
export default Settings;