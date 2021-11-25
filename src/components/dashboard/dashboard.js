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

    if(!getUser()) return <Redirect to="/login" exact/>;
    if(getUser())
        return(
            <main className="container-fluid">
            <Row className="main-container">
                <Col  lg={1} md={2} className="menu bg-navBg">
                        <SideBar></SideBar>
                </Col>
                
                <Col className="content"> 
                {console.log("factories", factories,"len",factories.length,"check",factories.length>=1)}
                    {factories? 
                        factories.map( (fact, i) => 
                            <Row className="container-factory" key={i}>                            
                                {/* {fact.name} */}
                                    
                                <Content factId={fact.id}></Content>
                                    
                            </Row>
                        )
                        :<></>}
                </Col>
            </Row>
            </main>
        );
    }

