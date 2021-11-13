import React, {useState, useEffect} from "react";
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axiosInstance from '../../Utils/axios'
import { ResponsiveLine } from '@nivo/line';


export default function SensorDiffAggrChart(props){
    const id=props.pLine
    const start_time = props.startTime
    const end_time = props.end_time
    // const body=props.body_request
    const body = JSON.stringify({
        "start_time": start_time,
        "end_time": end_time,
        "dur_time": 15
    })
    const [sensorData, setSensorData] = useState([]);
    const [productLine, setProductLine] = useState([]);
    // const [data, setData] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isResponced, setIsResponced] = useState(false);
    
    


    useEffect(()=>{
        
        axiosInstance
        .post(`reports/sensor/inline/aggrdata/`,
        JSON.stringify(body)
        ).then( (response) => {
            console.log(response.data)
            setSensorData(response.data)
            console.log(sensorData)
            
        }).catch((err)=>{
            // console.log(err)
        })
    },[id, setSensorData])

    
    // const result = Object.keys(sensorData).map((key) => [Number(key), sensorData[key]])
    // console.log(result)
    return(        
        
        <Row className="line_chart" style={{height: 500, width: 1000}}>
            <ResponsiveLine
                data={sensorData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: -1, max: 'auto', stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'time',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </Row>             
            
    );
    
}
