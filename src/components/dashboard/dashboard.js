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
            <div className="dashboard-card">
            <div className="sidebar">
                    <SideBar mode="desktop" />
                </div>
                <div className="mobile-navbar">
                    <SideBar mode="mobile" />
                    </div>
                <div className="dashboard-content">
                {factories? 
                    factories.map( (fact, i) => 
                        <Row className="container-factory" key={i}>                            

                                    {fact.name}
                                        <Content factId={fact.id}></Content>
                        </Row>
                    )
                    :<></>}
                </div>
            </div>
        </main>
    );
    
}

