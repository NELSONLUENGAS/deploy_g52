import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../View/Home';
import { Register } from '../View/Register';
import { Login } from '../View/Login';
import { Header } from '../Components/Header';
import { RuoterGuard } from './RuoterGuard';
import { Dashboard } from '../View/Dashboard';
import { Profile } from '../View/Profile';
import { AdminProducts } from '../View/AdminProducts';
import { Settings } from '../View/Settings';
import { UserProfile } from '../View/UserProfile';
import { useContext } from 'react';
import { MarketplaceContext } from '../context/MarketplaceProvider';
import { handleDecrypt } from '../helpers/helpers';

export const RouterLink = () => {
	const { userSession, isLoggedIn, token } = useContext(MarketplaceContext);

	return (
		<Router>
			<Header />
			<Routes>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path="register"
					element={<Register />}
				/>
				<Route
					path="login"
					element={<Login />}
				/>

				{/* Tipo Outlet o routas anidadas */}
				<Route
					element={
						<RuoterGuard
							isAllowed={userSession.role.includes('admin') && isLoggedIn}
						/>
					}
				>
					<Route
						path="dashboard"
						element={<Dashboard />}
					>
						<Route
							index
							element={<Profile />}
						/>
						<Route
							path="products"
							element={<AdminProducts />}
						>
							<Route
								path=":product_id"
								element={<AdminProducts />}
							/>
						</Route>

						<Route
							path="settings"
							element={<Settings />}
						/>
					</Route>
				</Route>
				{/* Tipo children */}
				<Route
					path="children"
					element={
						<RuoterGuard
							isAllowed={userSession.role.includes('admin') && isLoggedIn}
						>
							<UserProfile />
						</RuoterGuard>
					}
				/>
			</Routes>
		</Router>
	);
};
