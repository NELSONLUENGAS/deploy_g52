import { createContext, useState } from 'react';
import axios from 'axios';
import Rabbit from 'crypto-js/rabbit';
const { VITE_SERVER_URL, VITE_SERVER_URL_LOCAL, CRYPTO_SECRET } = import.meta
	.env;

export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
	const [userSession, setUserSession] = useState(
		localStorage.getItem('session')
			? JSON.parse(localStorage.getItem('session'))
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

	const logOut = () => {
		setTimeout(() => {
			setisLoggedIn(false);
		}, 3000);
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

		const tokenPayload = token.split('.')[1];

		const userSesion = JSON.parse(atob(tokenPayload));

		setUserSession({
			id: 1,
			role: 'admin',
			email: userSesion.email,
		});
		setisLoggedIn(true);

		localStorage.setItem('token', token);
		localStorage.setItem(
			'session',
			JSON.stringify({
				id: 1,
				role: 'admin',
				email: userSesion.email,
			})
		);
		setToken(token);

		window.location.href = '/dashboard';
	};

	return (
		<>
			<MarketplaceContext.Provider
				value={{ isLoggedIn, userSession, logOut, logIn, handleLoginSubmit }}
			>
				{children}
			</MarketplaceContext.Provider>
		</>
	);
};
