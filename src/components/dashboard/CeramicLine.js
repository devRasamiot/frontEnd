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
        <section >            
            {/* {loading? <Spinner animation="border" variant="primary" />: */}
                <Row className="line">
                {sublines.map( (line, i) => 
                 <Row className="container-lines align-content-center" key={i}>
                    <Row className="py-0 my-0">
                        <h6 className="text-black py-3 px-2">
                        {line.name}
                        </h6>
                    </Row>                            
                    
                    <Row className="py-0 my-0">
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