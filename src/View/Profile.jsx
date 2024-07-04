import { useContext } from 'react';
import { MarketplaceContext } from '../context/MarketplaceProvider';

export const Profile = () => {
	const { logOut } = useContext(MarketplaceContext);

	return (
		<>
			<button onClick={() => logOut()}>Log Out</button>
			<div>Admin Profile</div>
		</>
	);
};
