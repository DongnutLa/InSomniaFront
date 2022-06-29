import { useState } from 'react';
import axios from 'axios';

const initPermissions = ['VIEW_NEWS', 'VIEW_GROUPS', 'VIEW_ALBUMS', 'VIEW_PHOTOCARDS', 'VIEW_SONGS', 'VIEW_IDOLS']

const useAuth = () => {
	const [userToken, setUserToken] = useState(null);
	const [userData, setUserData] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userPermissions, setUserPermissions] = useState(initPermissions);
	const [headerConfig, setHeaderConfig] = useState({headers: {api: process.env.API_KEY}})
	
	
	const saveAuthData = (authObject) => {
		window.localStorage.setItem(
			'InSomniaAuthUser', JSON.stringify(authObject)
			)
		}
		
	const getAuthData = async () => {
		const userObject = window.localStorage.getItem('InSomniaAuthUser');
		if (userObject !== null) {
			const { token, user } = JSON.parse(userObject);
			setUserData(user);
			setUserToken(token);
			setIsAuthenticated(true);
			setUserPermissions(user.permissions);
			setHeaderConfig({
				headers: {
					...headerConfig.headers,
				  Authorization: `Bearer ${token}`,
				}
			})
		} else {
			const URL = process.env.REACT_API_URL;
			const endpoint = 'auth/permissions'
			const API = `${URL}${endpoint}`;
			const permissions = await axios.get(API, headerConfig);
			setUserPermissions(permissions.data);
		}
	}

	const deleteAuthData = () => {
		setUserData({});
		setUserToken(null);
		setIsAuthenticated(false);
		window.localStorage.removeItem('InSomniaAuthUser');
	}

	return { getAuthData, saveAuthData, deleteAuthData,
		 userToken, userData, isAuthenticated,
		 headerConfig, userPermissions };
};

export default useAuth;