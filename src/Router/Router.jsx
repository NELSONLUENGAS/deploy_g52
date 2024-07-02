import { Router, Routes, Route } from 'react-router-dom';
import { Home } from '../View/Home';
import { Register } from '../View/Register';
import { Login } from '../View/Login';

export const Router = () => {
	<Router>
		<Header />
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="/register"
				element={<Register />}
			/>
			<Route
				path="/login"
				element={<Login />}
			/>
		</Routes>
	</Router>;
};
