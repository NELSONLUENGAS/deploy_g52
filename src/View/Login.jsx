import { useContext } from 'react';
import { MarketplaceContext } from '../context/MarketplaceProvider';

export const Login = () => {
	const { logIn } = useContext(MarketplaceContext);
	return <button onClick={() => logIn()}>Log In</button>;
};
