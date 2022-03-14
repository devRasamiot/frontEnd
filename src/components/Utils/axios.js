import axios from 'axios';
import getApi from './api.js';
import {logoutFunc, loginFunc } from './userFunc.js';
import jwt from 'jwt-simple'

const urls = getApi()
const baseURL = urls[0]

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		// console.log(response.config.url)
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		// console.log("originalRequest", originalRequest)
		// console.log("Im in axios error section")
		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}
		if (
			error.response.status === 403
		){
			alert(
				'the item is not allowed for the user !'
			);
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' ||
			error.response.status === 401 ||
			error.response.statusText === 'Unauthorized'
		) {
			// console.log("Im in 401 and I want to refresh token")
			const refreshToken = localStorage.getItem('refresh_token');
			// console.log(localStorage.getItem('refresh_token'))
			console.log(`trying to refresh: ${refreshToken}`)
			if (refreshToken) {
				axiosInstance
					.post('user/token/refresh/', 
					JSON.stringify({
						refresh: refreshToken,
						}))
					.then((response) => {
						localStorage.setItem('access_token', response.data.access);
						localStorage.setItem('loggedIn', true);
						// console.log(localStorage.getItem('refresh_token'))

						axiosInstance.defaults.headers['Authorization'] =
							'JWT ' + response.data.access;
						originalRequest.headers['Authorization'] =
							'JWT ' + response.data.access;

						console.log(axiosInstance.defaults.headers)
						console.log(originalRequest.headers)
						return axiosInstance(originalRequest);
					})
					.catch((err)=>{
						// console.log(err)
						logoutFunc();
						window.location.href = '/login/';
					})	
			} else {
				logoutFunc();
				window.location.href = '/login/';
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
