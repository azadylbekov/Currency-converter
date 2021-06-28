import { useEffect } from 'react';
import { connect } from 'react-redux'
import { fetchData } from './redux/currencyList'

function Currency({ curData, fetchData }) {

	useEffect(() => {
		fetchData();
	}, []);

	const handleSelect = (e) => {
		fetchData(e.target.value);
	}

	return (
		<div className="container">
			<div className="currency-wrapper">
				<div className="cur-selector">
					<h3>Latest Currency</h3>
					<label htmlFor="currency">Choose a currency:</label>
					{curData.loading && (
						<select name="currency" id="currency-select" onChange={handleSelect} defaultValue='rub'>
							{Object.keys(curData.currencies).map((base, index) =>
								<option key={index} value={base}>{base}</option>
							)}
						</select>
					)}
				</div>
				{curData.loading ? (
					Object.keys(curData.currencies).map((keyName, i) => (
						<li className="currencies-list" key={i}>
							<div className='cur-item'>
								<div className="currency-label">1 {curData.base} = </div>
							</div>
							{/* ({curNames[keyName]}) */}
							<div className='cur-item'>
								<div className="currency-amount">{curData.currencies[keyName]}</div>
								<div className="currency-label">{keyName} </div>
							</div>
						</li>
					))
				) : 'Loading'}
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		curData: state.currencies
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchData: (base_cur) => dispatch(fetchData(base_cur))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Currency)

