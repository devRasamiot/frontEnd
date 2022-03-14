import React, {useState, useEffect} from "react";
import { Redirect, useHistory } from "react-router";
import {logoutFunc} from "../Utils/userFunc";
import axiosInstance from "../Utils/axios";
import DateTime from "./dateTime";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image"
import { Route } from "react-router";
import getApi from "../Utils/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTv, faHome, faChartLine, faChartBar, faBell, faCog, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import display from '../../pics/icons/display.png';
import barChart from '../../pics/icons/bar-chart.png';


export default function SideBar({ mode }){
  let history = useHistory();
  const [profile, setProfile] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isResponced, setIsResponced] = useState(false);
  const [now, setNow] = useState(new Date())
  const urls = getApi()
  const imgUrl = urls[1]
  const adminUrl = urls[0]
  const url=getApi()

  // useEffect(()=>{
  //     setIsLoading(true);
  //     axiosInstance
  //     .get(`user/info/`,{
  //     }
  //     ).then( (response) => {
  //       setProfile(response.data)
  //       setIsLoading(false);
        
  //     })  
  // },[setProfile])

  
  const [content, setContent]=useState("1");

  useEffect(() => {
    if (history.location.pathname ==="/dashboard"){
        setContent("1")
    }
    else if (history.location.pathname ==="/reports"){
        setContent("2")
    }
  })

  const logoutRedirect = () => {
    logoutFunc()
    history.push('/login')
  }


  let adminRedirect = ()=>{
    window.location.href = `${adminUrl}admin/`; 
      
  }

  function userRedirect (){
    history.push('/user/profile')
  }

  let dashboardRedirect =()=>{
    // return <Redirect to='/dashboard'/>;
    history.push('/dashboard')
    window.location.reload();
  }

  let reportRedirect =()=>{
    // return <Redirect to='/reports'/>;
    history.push('/reports')
    window.location.reload();
  }
    
    return(
        <>
          {mode === 'desktop' ? <div className="menuContainer">            
            <Row className="options">
                <div>
                <Row className={content=="1"? "option selected": "option"}>
                    <Image className="iconOptions" src={display} onClick={dashboardRedirect}></Image>
                </Row>

                <Row className={content=="2"? "option selected": "option"}>
                    <Image className="iconOptions" src={barChart} onClick={reportRedirect}></Image>
                </Row>
                </div>

            </Row>
            <Row className="setting">
              <Row className="iconSet">
                <FontAwesomeIcon icon={faPowerOff} onClick={logoutRedirect}  className="iconSetting" />              
              </Row>
            </Row>
            
        </div> : <div className="mobile-nav-container">
          <div className="nav-item-group">
            <div className={content=="1"? "nav-item selected-item": "nav-item"}>
            <Image className="nav-item-icon" src={display} onClick={dashboardRedirect}></Image>
            </div>
            <div className={content=="2"? "nav-item selected-item": "nav-item"}>
            <Image className="nav-item-icon" src={barChart} onClick={reportRedirect}></Image>
            </div>
            <div className="nav-item">
            <FontAwesomeIcon icon={faPowerOff} onClick={logoutRedirect}  className="setting-icon" />
            </div>
          </div>
          {/* <div className="nav-logout">
          <FontAwesomeIcon icon={faPowerOff} onClick={logoutRedirect}  className="setting-icon" />
          </div> */}
          </div>}
        </>
                   
    );
    
}


