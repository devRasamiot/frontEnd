import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axiosInstance from '../../Utils/axios'
import SensorDiffAggrChart from './sensorDiffAggrChart'
import React, {
    useEffect,
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
    Fragment
  } from "react";
import DateFnsUtils from "@date-io/date-fns";
import SnoozeIcon from "@material-ui/icons/Snooze";
import AlarmIcon from "@material-ui/icons/AddAlarm";
import { IconButton, InputAdornment, Grid } from "@material-ui/core";
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
  
// import flatpickr from 'flatpickr'
// import 'flatpickr/dist/flatpickr.min.css'
// import 'flatpickr/dist/themes/dark.css'

export default function SensorsInLineChart(props){
    const id=props.pLine
    const start_time = props.startTime
    const end_time = props.end_time
    // const [sensorData, setSensorData] = useState([]);
    // const [productLine, setProductLine] = useState([]);
    // const [data, setData] = useState([]);
    // const [loading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);
    // const [isResponced, setIsResponced] = useState(false);
    const body = JSON.stringify({
        "start_time": start_time,
        "end_time": end_time,
        "dur_time": 15
    })
    

    // const [clearedDate, handleClearedDateChange] = useState(null);
    // const [fromDate, handleFromDateChange] = useState(new Date("2019-01-01T18:54"));
    // const [toDate, handleToDateChange] = useState(new Date("2019-01-01T18:54"));



    
    let filterSubmit = (event)=>{
        return(
            <SensorDiffAggrChart
                line_id={id} 
                body = {body}
            />
        );
    }

    return(        
        <section className="container-sensors">   
            <SensorDiffAggrChart
                line_id={id} 
                body = {body}
            />
        </section>
            
    );
    
}
