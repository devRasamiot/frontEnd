import React, {useState, useEffect} from "react";

import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axiosInstance from "../Utils/axios";


export default function CeramicSubLine(props){
    const id=props.pLine
    const [sensors, setSensors] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [type, setType] = useState([]);
    const [error, setError] = useState(null);
    const [typeError, setTypeError] = useState(null);

    useEffect(()=>{
        function getData(){
            // setIsLoading(true);
            axiosInstance
            .get(`reports/sensor/factorysubline/${id}/`,{
            }
            ).then( (response) => {
                response.data.sort((a,b) => a.place_inline - b.place_inline)
                setSensors(response.data)
                // setIsLoading(false);
                
            })
        }
        getData()
        const interval = setInterval(() => getData(), 10000)
        return () => {
          clearInterval(interval);
        }
              
    },[setSensors]);

    
    useEffect(()=>{   
        setIsLoading(true); 
       axiosInstance
       .get(`sensortype/`,{
       }
       ).then((response)=>{
        setIsLoading(false);
        setType(response.data)
       })

    },[setType]);

    return(
        <section >            
            
                <Row className="container-sensors">
                {sensors.map( (sensor, i) => 
                 <Col lg={2} md={3} sm={6} xs={12} key={i}>
                 <span>
                    <Row className="sensor-icon-info" >
                        
                        <Col md={4} sm={6} xs={12}>
                            {type.map((type, j) =>
                                // <div key={j} >
                                    // console.log(sensor.type , type.id)
                                    sensor.type === type.id?
                                        <img
                                            src={type.icon}
                                            alt="sensor-icon"
                                            className="sensor-icon"
                                        />:
                                        ""
                                    
                                // </div>
                            )}
                        </Col>
                        <Col md={8} sm={6} xs={12} className="sensor-name px-0 text-black">
                            {sensor.name} 
                        </Col> 
                    </Row>
                        <Row>  
                            <Col md={12}className="live-data">   
                                <span className="live-data">           
                                    {sensor.live_data}
                                </span>
                            </Col>
                        </Row>
                    
                    
                

                 </span>
                 </Col>
                
                )}
                </Row>
            

            
        </section>
    );

}