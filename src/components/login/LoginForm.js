import React, {useState, Route} from "react";
import {useHistory } from "react-router";
import axios from 'axios'
// import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { Link, Redirect } from 'react-router-dom';
import { setUserSession} from '../Utils/userFunc';
import {loginFunc} from '../Utils/userFunc';
import {getUser} from '../Utils/userFunc';
import axiosInstance from '../Utils/axios'
import getApi from "../Utils/api";
import Dashboard from "../dashboard/dashboard.js";



export default function LoginForm(props){
  const [input , setInput] = useState({
    userName : "",
    password : "",
});
let history = useHistory();
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [errorShow, setErrorShow] = useState(false);
const [redirect, setRedirect] = useState(getUser());
const [labelShowU, setLableShowU] = useState(false);
const [labelShowP, setLableShowP] = useState(false);
let errors = [];

let validate = ()=>{
  
  let isValid = true;

  if (input.userName === "") {
    isValid = false;
    setIsError(true);
    errors += "نام کاربری خود را وارد کنید\n";
  }    
  if (input.password === "") {
    isValid = false;
    setIsError(true);
    errors += "رمز عبور را وارد کنید\n";
  }
  setError(errors)
  return isValid;

}
let handleSubmit = (event)=>{
  const urls = getApi()
  const baseURL = urls[0]
    event.preventDefault();
    console.log("error", error );
  // console.log(input.userName , input.password);
  if(validate()){
    setIsLoading(true);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axios
    	.post(`${baseURL}user/token/`,{
        phone : input.userName,
        password : input.password,
    },
    {
      'Content-Type': 'application/json',
    }
    ).then( (res) => {
      // localStorage.setItem('access_token', res.access);
      // localStorage.setItem('refresh_token', res.refresh);
      // axiosInstance.defaults.headers['Authorization'] =
  	  //   'JWT ' + localStorage.getItem('access_token');
      console.log(res.data)
      loginFunc(res.data)
      setIsLoading(false);
      setRedirect(getUser());
      // console.log(localStorage.getItem('access_token'),"and the refresh:",localStorage.getItem('refresh_token'))
        
    })
    .catch(err=>{
      // console.log("token error :",err.response , err.response.status);
      if(err.response){
        if(err.response.status === 401){
          errors += "کاربری با این مشخصات یافت نشد"
        }
        setError(errors)
        setIsError(true)
        setIsLoading(false);
        console.log(error)
      }
      else{
        errors += "مشکلی در سامانه پیش آمده"
        setError(errors)
        setIsLoading(false);
        setIsError(true)
        console.log(errors)

      }
    });
  }
  
}


if(redirect) return <Redirect to="/dashboard"/>;
else
  return(
    <main>
        {/* <section id="container"> */}
          <section id="container-login" >          
            <h5>ورود به حساب کاربری</h5>
              
              <form className=""  to="/dashboard" method="POST" onSubmit={handleSubmit} >
                        <label variant="danger" className="texts text-danger pb-3">
                          {isError ? error 
                          :null }
                        </label>

                        <legend class="border-bottom mb-4"></legend>  
                          <div className="form-group rounded-lg shadow-top-sm">
                            {labelShowU && <label >نام کاربری:</label>}
                          <input 
                              aria-label="userName" 
                              name="userName" 
                              type="text" 
                              // required 
                              className="form-control text-center  "
                              placeholder="شماره تلفن"
                              onChange={(e) => {setInput({...input, userName : e.target.value})}}
                              
                          />
                          {/* <p className="text-danger"> {isError ? error["userName"]:null } </p> */}
                          </div>

                          <div className="form-group rounded-lg shadow-top-sm" >
                            {labelShowP && <label>رمزعبور:</label> }
                          <input 
                              aria-label="password" 
                              name="password" 
                              type="password" 
                              // required 
                              className="form-control text-center"
                              placeholder="رمز عبور"
                              onChange={(e) => {setInput({...input, password : e.target.value}); }}
                             
                              />
                              {/* <p className="text-danger"> {isError ?error["password"]:null} </p> */}
                          </div>
                          
                         
                           
                         
                          
                          <Button
                                    type="submit"
                                    varient="primary"
                                    className=" d-block mx-auto my-3 px-5 mt-4"
                                    
                                    >
                                    
                                    {isLoading ? <Spinner animation="border" variant="primary" /> : 'ورود به حساب کاربری'}
                          </Button>
                          
                          <div className="form-group text-center" >
                            <Link className="text-info" variant="light" to="/forgotPassword">
                              رمزعبور خود را فراموش کرده اید؟
                            </Link>
                          </div>
                          {/* {forgotShow &&
                              <ForgotPassword
                              show={forgotShow}
                              onHide={handleClose}
                            />
                            
                            } */}
                  </form>
                  
                

            
            
        
            
            
    </section>
    </main>

);


}
