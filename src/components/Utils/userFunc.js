import axios from 'axios';
import axiosInstance from 'axios';
import getApi from './api.js';

import { Redirect } from 'react-router-dom';
//import xtype from 'xtypejs';
const url = getApi()[0]
const nUrl = getApi()[1]

export const loginFunc = (res) =>{
  localStorage.setItem('access_token', res.access);
  localStorage.setItem('refresh_token', res.refresh);
  localStorage.setItem('loggedIn', true);
  axiosInstance.defaults.headers['Authorization'] =
  	'JWT ' + localStorage.getItem('access_token');
  
}

export const logoutFunc = () => {
  console.log("Im in log out");
  const ref = localStorage.getItem('refresh_token');
  console.log(ref)
  const response = axios.post(`${url}user/logout/blacklist/`, 
  {
    refresh_token: ref
  })

  console.log("blacklist:", response)
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('loggedIn');
  axiosInstance.defaults.headers['Authorization'] = null;
}

export const getUser=()=>{
  //if(sessionStorage.getItem('loggedIn')===true) sessionStorage.setItem('loggedIn',false);
  return localStorage.getItem('loggedIn')||false;
}
// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem('access_token') || null;
}
