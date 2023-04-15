import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

import Footer from './components/Footer';
import {Route, Switch} from 'react-router';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import Protectedroute from './ProtectedRoute';
import InviteForm from './components/invitation';
import { useEffect, useState } from 'react';
import PaymentForm from './components/PaymentForm';
import Build from './components/Build';
import ResetPassword from './components/ResetPassword';
import VerificationCode from './components/VerificationCode';
import VerificationMail from './components/VerificationMail';
import TermsAndConditions from './components/TermsAndConditions';
import SettingsPage from './components/SettingsPage';
import Profile from './components/Profile';
import EmailForm from './components/ForgotPassword';
import ReactSwitch from 'react-switch';
import ProjectsList from './components/ProjectsList';
import ConnectToStore from './components/ConnectToStore';
import Repository from 'github-api/dist/components/Repository';


import UploadFile from "./components/UploadFile";
import HomeeeRE from "./pages/Home";
import Fileapk from "./pages/fileapk";
import Qr from "./pages/QRCODE"
import Card from "./pages/Card";
import UPdate from "./pages/Details";
import Info from "./pages/InfoRelease";
import InfoDetails from "./pages/infodetails";
import Statstique from "./pages/stastique";

function App() {
  //const [isDarkMode, setIsDarkMode] = useState(false);

  // Check If User is Logged In
  const [auth, setauth] = useState(false);
  const [auth1, setauth1] = useState(true);

  const isLoggedIn = async () => {
    try {
      const res = await fetch('/auth', {
        method : "GET",
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        credentials : "include"
      });

      if(res.status === 200){
        setauth(true)
        setauth1(false)
      }
      if(res.status === 401){
        setauth(false)
        setauth1(true)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
   
    <div >
      {/* <ReactSwitch checked={isDarkMode} onChange/> */}
      {/* /<ReactSwitch/> */}
      <Navbar auth={auth1}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/service" component={Services} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/invitation" component={InviteForm} />
        <Route exact path="/ProjectList" component={ProjectsList} />
      
        <Protectedroute exact path="/payment" component={PaymentForm} auth={auth1}/>
        <Protectedroute exact path="/VerificationCode" component={VerificationCode} auth={auth1}/>

        <Protectedroute exact path="/dashboard" component={Dashboard} auth={auth1}/>
        <Protectedroute exact path="/SettingsPage" component={SettingsPage} auth={auth1}/>
        <Protectedroute exact path="/Profile" component={Profile} auth={auth1}/>
        <Protectedroute exact path="/ConnectToStore" component={ConnectToStore} auth={auth} />
        <Protectedroute exact path="/VerificationMail" component={VerificationMail} auth={auth1}/>
        <Protectedroute exact path="/TermsAndConditions" component={TermsAndConditions} auth={auth1}/>
        <Protectedroute exact path="/ResetPassword" component={ResetPassword} auth={auth1}/>
        <Protectedroute exact path="/login" component={Login} auth={auth1}/>
        <Protectedroute exact path="/register" component={Register} auth={auth1}/>
        <Protectedroute exact path="/dashboard" component={Dashboard} auth={auth}/>
        <Protectedroute exact path="/logout" component={Logout} auth={auth}/>
        <Route exact path="/ForgotPassword" component={EmailForm} />


{/* arij */}
<Route exact path="/Release" component={HomeeeRE} auth={auth}/>
        <Route exact path="/uploadFile" component={UploadFile} auth={auth}/>
        <Route exact path="/Release/:id" component={UPdate} auth={auth}/>
        <Route exact path="/info/:id" component={Info} auth={auth}/>
        <Route exact path="/qrcode/:id" component={Qr} auth={auth}/>
        <Route exact path="/Android/:id" component={InfoDetails} auth={auth}/>
        <Route exact path="/statstique" component={Statstique} auth={auth}/>
        {/* end */}



      </Switch>
      <Footer/>
      </div>

    
  );
}

export default App;



