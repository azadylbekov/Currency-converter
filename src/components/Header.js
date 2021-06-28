import { Link } from 'react-router-dom';

function Header() {
	return (
		<header className="header">
			<div className="container">
				<nav>
					<Link className='logo' to="/">Currency Converter</Link>
					<Link className='link' to="/currency">Currency</Link>
				</nav>
			</div>
		</header>
	)
}

export default Header
