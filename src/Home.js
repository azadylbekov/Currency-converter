import { useEffect, useState } from 'react';


function Home() {

	let [curNames, setCurNames] = useState({});
	let [namesLoaded, setNamesLoaded] = useState(false);
	let [fromCur, setFromCur] = useState();
	let [toCur, setToCur] = useState();
	let [amount, setAmount] = useState(1);
	let [result, setResult] = useState(1);
	let [resultLoaded, setResultLoaded] = useState(false);

	useEffect(() => {
		fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
			.then(res => res.json())
			.then(data => {
				setFromCur([Object.keys(data)[0]]);
				setToCur([Object.keys(data)[0]]);
				setCurNames(data);
				setNamesLoaded(true);
			})
			.catch(err => console.error(err));
	}, []);

	const handleFromSelected = (e) => {
		setFromCur(e.target.value);
	}

	const handleToSelected = (e) => {
		setToCur(e.target.value);
	}

	const handleAmount = (e) => {
		setResultLoaded(false);
		setAmount(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchConvert();
	}

	const fetchConvert = () => {
		fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCur}/${toCur}.json`)
			.then(res => res.json())
			.then(data => {
				let dataObj = data;
				let differ = dataObj[Object.keys(dataObj)[Object.keys(dataObj).length - 1]];
				let total = differ * amount;
				setResult(total);
				setResultLoaded(true);
			})
			.catch(err => console.error(err));
	}

	return (
		<div>
			<div className="home-card">
				<div className="container">
					<form className='currency-form' onSubmit={(e) => handleSubmit(e)}>
						<label>
							<span>Enter the amount from currency to currency</span>
							<br />
							<div className="form-row">
								<div className="input-item">
									<input type="number" value={amount} onChange={(e) => handleAmount(e)} />
								</div>
								<div className="select-item">
									<select name="" className="convert-select" onChange={(e) => handleFromSelected(e)}>
										{namesLoaded && (
											Object.keys(curNames).map((cur, index) => (
												<option key={index} value={cur}>{cur}</option>
											))
										)}
									</select>
									<span>to</span>
									<select name="" className='convert-select' onChange={(e) => handleToSelected(e)}>
										{namesLoaded && (
											Object.keys(curNames).map((cur, index) => (
												<option key={index} value={cur}>{cur}</option>
											))
										)}
									</select>
								</div>
							</div>
						</label>
						<br />
						<button className='btn'>Convert</button>
					</form>
				</div>
			</div>
			{resultLoaded && <div className="currency-result">
				<h3>{amount} {fromCur} is {result} {toCur}</h3>
			</div>}
		</div>
	)
}

export default Home


