import  React, { useState , useEffect } from 'react'
import calicon from '../../pics/icons/calendar.png'
import timeicon from '../../pics/icons/clock.png'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <Row>

            <Row>
                <Col md={1}>
                    <img
                      src={calicon}
                      alt="icon"
                      className="icons"
                    />
                </Col>
                <Col md={1}/>
                <Col md={9}>
                    <span className="icon-info">
                    {date.toLocaleDateString()}
                    </span>
                </Col>
            </Row>
            <Row>
                <Col md={1}>
                    <img
                      src={timeicon}
                      alt="icon"
                      className="icons"
                    />
                </Col>
                <Col md={1}/>
                <Col md={9}>
                    <span className="icon-info">
                    {date.toLocaleTimeString()}
                    </span>
                </Col>
            </Row>

        </Row>
    )
}

export default DateTime