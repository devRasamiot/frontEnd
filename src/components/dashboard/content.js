import React, {useState, useEffect, Fragment} from "react";
import axios from 'axios'
// import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axiosInstance from '../Utils/axios'

import CeramicLine from "./CeramicLine";
import { Redirect, useHistory } from "react-router";
import SensorsInLineChart from "./reports/sensorsInLineChart"
import SensorDiffAggrChart from "./reports/sensorDiffAggrChart"
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from "@fortawesome/free-solid-svg-icons";


export default function Content(props){
    const fact_id = props ? props.factId: null
    console.log(fact_id)
    const [productLine, setProductLine] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isResponced, setIsResponced] = useState(false);

    

    var dt = new Date();
    const [fromDate, handleFromDateChange] = useState(dt.setHours( dt.getHours() + 2 ));
    const [toDate, handleToDateChange] = useState(dt);
    const [getDate, setGetDate] = useState(false);

    
    

    useEffect(()=>{
        console.log(fact_id,"fact_id")
        setIsLoading(true);
        console.log("here is factoryline api")
        axiosInstance
        .get(`factoryline/factory/${fact_id}/`,{
        }
        ).then( (response) => {
            
            setProductLine(...productLine,response.data)
            setIsLoading(false);
            
        })
    
        
    },[setProductLine,fact_id])
    
    let history = useHistory();
    console.log(history.location);
    const [content, setContent]=useState("1");
    useEffect(() => {
        if (history.location.pathname ==="/dashboard"){
            console.log("here is dashboard")
            setContent("1")
        }
        else if (history.location.pathname ==="/reports"){
            setContent("2")
        }

    });

    let handledateChart = ()=>{
        setGetDate(true);       
    }

    let dashboarPage =
        <Row>
            <section className="line-section">
                <Row className="line">
                    {
                        productLine.map( (line, i) => 
                        <Row className="container-lines align-content-center" key={i}>                            
                                <Row>
                                    <h6>
                                    {line.name}
                                    </h6>
                                </Row>   
                                <Row>
                                    <Col>
                                        <CeramicLine pLine={line.id}></CeramicLine>
                                    </Col>
                                </Row>                            
                        </Row>
                        )
                    }
                </Row> 
            </section>               
        </Row>

    let reportPage =             
        <Row>
            <section className="line-section">
                    <Row className="line">
                            <div className="container-dates">
                                <Fragment className="date-picker">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker
                                            value={fromDate}
                                            enablePast
                                            onChange={handleFromDateChange}
                                            label="from date and time"
                                            showTodayButton
                                        />
                                        <DateTimePicker
                                            value={toDate}
                                            enablePast
                                            onChange={handleToDateChange}
                                            label="to date and time"
                                            showTodayButton
                                        />
                                    </MuiPickersUtilsProvider>
                                </Fragment>
                                <button className="date-filter" onClick={handledateChart}>
                                    <FontAwesomeIcon icon={faSearch}  className="searchIcon" />   
                                </button>
                            </div>
                            {getDate? 
                                productLine.map( (line, i) => 
                                    <Row className="container-lines align-content-center" key={i}>                            
                                            <Row>
                                                <h6>
                                                {line.name}
                                                </h6>
                                            </Row>   
                                            <Row>
                                                <Col>          
                                                    <SensorDiffAggrChart pLine={line.id} startTime={fromDate} endTime={toDate}></SensorDiffAggrChart>
                                                </Col>
                                            </Row>                            
                                    </Row>
                                )
                        :<></>}
                    </Row>
            </section>
        </Row>


    return(
      <>
      
        {console.log("here is content")}
        {content==="1"? 
            <>{dashboarPage}</>:<></>}
        {content==="2"? 
            <>{reportPage}</>:<></>}
      </>  
    );
}

