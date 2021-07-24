import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import { useEffect, useState } from 'react';

function App() {
  const [pictureUrl, setpictureUrl ] = useState(logo);
  const [idToken, setidToken ] = useState("");
  const [displayName, setdisplayName ] = useState("");
  const [statusMessage, setstatusMessage ] = useState("");
  const [userId, setuserId ] = useState("");


  const logout = () => {
    liff.logout();
    window.location.reload();
  }

  const initLine = () => {
    liff.init({ liffId: '1656245947-n9qGjdJy' }, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }


  const runApp = () => {
    const idToken = liff.getIDToken();
    setidToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setdisplayName(profile.displayName);
      setidToken(profile.idToken);
      setpictureUrl(profile.pictureUrl);
      setstatusMessage(profile.statusMessage);
      setuserId(profile.userId);
      
    }).catch(err => console.error(err));
  }

  useEffect(() => {
      initLine();
    }, []);

  return (
    <div className="App">
      <header className="App-header">
      <div >

      <h1>Angular with LINE Login</h1>
        
        
        <img src={pictureUrl} width="300px" height="300px"/>
        <p style={{  marginLeft: "20%"}}><b>id token: </b> { idToken }</p>
        <p style={{  marginLeft: "20%"}}><b>display name: </b> { displayName }</p>
        <p style={{  marginLeft: "20%"}}><b>status message: </b> { statusMessage }</p>
        <p style={{  marginLeft: "20%"}}><b>user id: </b> { userId }</p>
        <button onClick={() =>logout()} style={{width: "100%",height: 30}}>Logout</button>


        
      </div>
      </header>
    </div>
  );
}

export default App;
