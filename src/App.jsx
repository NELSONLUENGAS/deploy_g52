import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header';
import { Home } from './View/Home';
import { Register } from './View/Register';
import { Login } from './View/Login';

function App() {
	return (
		<>
			<BrowserRouter>
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
			</BrowserRouter>
		</>
	);
}

export default App;
