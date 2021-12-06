import { Router } from '@reach/router';

import { UserContextProvider } from './context/UserContext';
import HomePage from './screen/HomePage';
import OrdersPage from './screen/OrdersPage';
import './App.css';

function App() {
  	return (
		<UserContextProvider>
			<Router>
				<HomePage path="/" />
				<OrdersPage path="/orders" />
			</Router>
		</UserContextProvider>
  	);
}

export default App;
