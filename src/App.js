import Home from "./Home";
import Currency from "./Currency";
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from "./components/Footer";


function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="wrapper">
					<Header />
					<Switch>
						<Route exact path='/'>
							<Home />
						</Route>
						<Route path='/currency'>
							<Currency />
						</Route>
					</Switch>
					<Footer />
				</div>
			</Router>
		</Provider>
	);
}

export default App;
