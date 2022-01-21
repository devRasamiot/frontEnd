import React, {useState, useEffect} from "react";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Content from "./content";
import SideBar from "./sideBar";
import axiosInstance from '../Utils/axios'


export default function Dashboard(props){
    const [factories, setFactories] = useState([]);


    useEffect(()=>{
        axiosInstance
	    .get(`factory/`,{})
        .then((response) =>{
            setFactories(response.data)
        })
    },[setFactories])


    return(
        <main className="container-fluid">
        <Row className="main-container">
            <Col  lg={1} md={2} className="menu bg-navBg">
                    <SideBar></SideBar>
            </Col>
            
            <Col className="content"> 
            {/* {console.log("factories", factories,"len",factories.length,"check",factories.length>=1)} */}
                {factories? 
                    factories.map( (fact, i) => 
                        <Row className="container-factory" key={i}>                            
                                {/* <Row >
                                    <h6>
                                    {fact.name}
                                    </h6>
                                </Row>   
                                <Row>
                                    <Col>           */}
                                    {fact.name}
                                        <Content factId={fact.id}></Content>
                                    {/* </Col>
                                </Row>                             */}
                        </Row>
                    )
                    :<></>}
            </Col>
        </Row>
        </main>
    );
    
}

