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
        <section className="container-sensors"> 
        {sensors.map((sensor, i) =>
            <div className="sensors-box">
            <div className="sensor-info">
            <div className="sensor-icon-box">
                <span className="sensor-info">
                    {sensor.name}
                </span>
            </div>
            <div>
            {type.map((type, j) => 
                <div key={j} className="sensor-icon-box">
                    {sensor.type === type.id ? 
                    <img src={type.icon} 
                    alt="sensor-icon" 
                    className="sensor-icon" /> : ''}
                </div>)}
            </div>
            </div>
            <div className="sensor-icon-box">
                <span className="sensor-live-data">
                    {sensor.live_data}
                </span>
            </div>
            </div>
        )}           
        </section>
    );

}
