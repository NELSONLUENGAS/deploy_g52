import { useContext, useEffect, useState } from 'react';
import { MarketplaceContext } from '../context/MarketplaceProvider';
import { handleDecrypt } from '../helpers/helpers';

export const Profile = () => {
	const { logOut, getProfile, token } = useContext(MarketplaceContext);
	const [userProfile, setUser] = useState({});

	useEffect(() => {
		getProfile(handleDecrypt(token))
			.then((response) => response)
			.then((user) => setUser(user));
	}, []);

	return (
		<>
			<button onClick={() => logOut()}>Log Out</button>
			<div>Admin Profile</div>
			<h1>Hola querido {userProfile.email}</h1>
		</>
	);
};
