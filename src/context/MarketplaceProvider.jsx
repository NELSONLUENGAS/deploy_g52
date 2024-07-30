import { createContext, useState } from 'react';
import axios from 'axios';
import { decodeToken, handleCrypt, handleDecrypt } from '../helpers/helpers';

const { VITE_SERVER_URL, VITE_SERVER_URL_LOCAL, CRYPTO_SECRET } = import.meta
	.env;

export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
	const [userSession, setUserSession] = useState(
		localStorage.getItem('session')
			? JSON.parse(handleDecrypt(localStorage.getItem('session')))
			: {
					email: '',
					role: '',
					id: '',
			  }
	);

	const [token, setToken] = useState(
		localStorage.getItem('token') ? localStorage.getItem('token') : null
	);

	const [isLoggedIn, setisLoggedIn] = useState(false);

	const logIn = async (userData) => {
		const tokenJson = await axios.post(
			`${VITE_SERVER_URL_LOCAL}/api/users/login`,
			userData
		);
		const { token } = tokenJson.data;
		return token;
	};

	const getProfile = async (token) => {
		const userData = await axios.get(
			`${VITE_SERVER_URL_LOCAL}/api/users/perfil`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const { user } = userData.data;
		return user;
	};

	const logOut = () => {
		setUserSession({
			email: '',
			role: '',
			id: '',
		});

		setToken(null);

		localStorage.removeItem('token');
		localStorage.removeItem('session');
	};

	const handleLoginSubmit = async (event) => {
		event.preventDefault();

		const {
			email: { value: email },
			password: { value: password },
		} = event.target;

		const userData = {
			email,
			password,
		};

		const token = await logIn(userData);

		const userSesion = decodeToken(token);

		setUserSession({
			id: 1,
			role: 'admin',
			email: userSesion.email,
		});

		setisLoggedIn(true);

		localStorage.setItem('token', handleCrypt(token));

		localStorage.setItem(
			'session',
			handleCrypt(
				JSON.stringify({
					id: 1,
					role: 'admin',
					email: userSesion.email,
				})
			)
		);

		setToken(handleCrypt(token));

		window.location.href = '/dashboard';
	};

	return (
		<>
			<MarketplaceContext.Provider
				value={{
					isLoggedIn,
					userSession,
					logOut,
					logIn,
					handleLoginSubmit,
					token,
					getProfile,
				}}
			>
				{children}
			</MarketplaceContext.Provider>
		</>
	);
};
