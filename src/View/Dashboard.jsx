import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { MarketplaceContext } from '../context/MarketplaceProvider';

export const Dashboard = () => {
	const { userSession, isLoggedIn } = useContext(MarketplaceContext);
	console.log(userSession, isLoggedIn);
	return (
		<>
			<div>Dashboard Private</div>
			<Outlet />
		</>
	);
};
