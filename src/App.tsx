import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcome';
import TossPage from './pages/toss';
import PlayPage from './pages/play';

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
				<Route
					path="/play/:id"
					element={<PlayPage />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
