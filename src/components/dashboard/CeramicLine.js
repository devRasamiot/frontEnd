import React, {useState, useEffect} from "react";
import axios from 'axios'
// import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axiosInstance from "../Utils/axios";
import CeramicSubLine from "./CeramicSubLine";


export default function CeramicLine(props){
    const id=props.pLine
    const [sublines, setSublines] = useState([]);
    const [loading, setIsLoading] = useState(false);
    
    const [error, setError] = useState(null);
    const [typeError, setTypeError] = useState(null);

    useEffect(()=>{
        function getData(){
            setIsLoading(true);
            axiosInstance
            .get(`subline/line/${id}/`,{
            }
            ).then( (response) => {
                // response.data.sort((a,b) => a.place_inline - b.place_inline)
                setSublines(response.data)
                setIsLoading(false);
                
            })
        }
        getData()              
    },[setSublines]);

    
    return(
        <section className="container-sensors">            
            {/* {loading? <Spinner animation="border" variant="primary" />: */}
                <Row className="line">
                {sublines.map( (line, i) => 
                 <Row className="container-lines align-content-center" key={i}>
                    <Row className="full-width-row">
                        <h5 style={{marginBottom: '.5rem'}}>
                        {line.name}
                        </h5>
                    </Row>                            
                    
                    <Row className="full-width-row">
                        <Col >
                            <CeramicSubLine pLine={line.id}></CeramicSubLine>
                        </Col>
                    </Row>
                </Row>
                )}   
                </Row>             
                
            

            
        </section>
    );

}