import React, {useState, useEffect, Redirect, Route} from "react";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// import Collapse from '@bit/react-bootstrap.react-bootstrap.collapse';
// import Collapse from 'react-bootstrap'
import Content from "./content";
import SideBar from "./sideBar";
import axiosInstance from '../Utils/axios'
import { getUser } from "../Utils/userFunc";
import LoginForm from "../login/LoginForm.js";


export default function Dashboard(props){
    const [factories, setFactories] = useState([]);
    // const [openState, setOpenState] = useState([]);
    
    useEffect(()=>{
        if(getUser()){
            axiosInstance
            .get(`factory/`,{})
            .then((response) =>{
                setFactories(response.data)
            })
        }
    },[setFactories],getUser())

    // let contentState = (key)=>{
    //     openState[key] = !openState[key]
    // }


    return(
        <main className="container-fluid">
            <div className="dashboard-card">
            <div className="sidebar">
                    <SideBar mode="desktop" />
                </div>
                {/* <div className="mobile-navbar">
                    <SideBar mode="mobile" />
                    </div> */}
                <div className="dashboard-content">
                {factories? 
                    factories.map( (fact, i) => 
                        <Row className="container-factory" key={i}>                            
                                    <span style={{color: '#fff', fontSize: '16px'}}>{fact.name}</span>
                                        <Content factId={fact.id}></Content>
                        </Row>
                    )
                    :<></>}
                </div>
            </div>
            <div className="mobile-navbar">
                    <SideBar mode="mobile" />
                    </div>
        </main>
    );
    
}


