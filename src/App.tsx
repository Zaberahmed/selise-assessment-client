import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcome';
import TossPage from './pages/toss';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<WelcomePage />}
				/>
				<Route
					path="/toss"
					element={<TossPage />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
