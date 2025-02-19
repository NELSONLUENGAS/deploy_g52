import { useContext } from 'react';
import { MarketplaceContext } from '../context/MarketplaceProvider';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Login = () => {
	const { handleLoginSubmit } = useContext(MarketplaceContext);
	return (
		<Form onSubmit={handleLoginSubmit}>
			<Form.Group
				className="mb-3"
				controlId="email"
			>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
				/>
			</Form.Group>

			<Form.Group
				className="mb-3"
				controlId="password"
			>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
				/>
			</Form.Group>

			<Button
				variant="primary"
				type="submit"
			>
				Submit
			</Button>
		</Form>
	);
};
