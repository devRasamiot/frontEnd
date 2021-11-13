import React, {useState, useEffect} from "react";
import Spinner from 'react-bootstrap/Spinner'
import avatar from '../../pics/icons/pesnl pic.png'
import idcart from '../../pics/icons/id-card.png'


import statusicon from '../../pics/icons/clipboard.png'
import adminicon from '../../pics/icons/manager.png'
import { useHistory } from "react-router";
import logoutFunc from "../Utils/Common";
import axiosInstance from "../Utils/axios";
import DateTime from "./dateTime";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image"
import { Route } from "react-router";
import getApi from "../Utils/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' 

// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' 


export default function Navmenu(props){
  let history = useHistory();
  const [profile, setProfile] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isResponced, setIsResponced] = useState(false);

  const [now, setNow] = useState(new Date())
  const urls = getApi()

  const imgUrl = urls[1]
  // console.log(getApi(), imgUrl,urls)
  const adminUrl = urls[0]
  const url=getApi()
  useEffect(()=>{
      setIsLoading(true);
      axiosInstance
      .get(`user/info/`,{
      }
      ).then( (response) => {
        setProfile(response.data)
        setIsLoading(false);
        
      })
  },[setProfile])

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

  let reportRedirect =()=>{
    history.push('/reports')
  }
    
    return(
        
                   
        <section >            
            <Row className="user">
              <Col lg={6} md={12} >
              
              <FontAwesomeIcon icon={faSearch}
              />
              {loading? <Spinner variant="primary" />:
                <Image
                src={imgUrl+profile.profile_pic}
                alt="Profile"
                className="profile-pic"
                roundedCircle
                fluid 
              />}
              
              </Col>
              <Col lg={6} md={12}>
              <span onClick={logoutRedirect} className="logout text-danger">خروج</span>
              </Col>
            </Row>
            <div className="info">
              {/* <div className="personal-info"> */}
                <Row>
                  <Col md={1}>
                    <img
                      src={idcart}
                      alt="icon"
                      className="icons"
                    />
                  </Col>
                  <Col md={1}/>
                  <Col md={9}>
                    <span onClick={userRedirect} id="username" className="icon-info">
                    {loading? <Spinner variant="primary" />:profile.user_name}
                    </span>
                  </Col>
                </Row>

                <DateTime></DateTime>

              
             
                  <div onClick={reportRedirect} className="status">
                    <img
                      src={statusicon}
                      alt="icon"
                      className="icons"
                    />
                    <span  className="btn-handle">
                      وضعیت کلی
                    </span>
                  </div>
                  <div className="admin" onClick={adminRedirect}>
                    <img
                      src={adminicon}
                      alt="icon"
                      className="icons"
                    />
                    <span className="btn-handle">
                      مدیریت
                    </span>
                  </div>                  
              
            </div>
            
        </section>







        
    );
    
}


