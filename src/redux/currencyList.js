export const FETCH_CUR_REQUEST = 'FETCH_CUR_REQUEST';
export const FETCH_CUR_SUCCESS = 'FETCH_CUR_SUCCESS';
export const FETCH_CUR_FAILURE = 'FETCH_CUR_FAILURE';
const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';

export const fetchCurRequest = () => {
	return {
		type: FETCH_CUR_REQUEST
	}
}

export const fetchCurSuccess = (data, base_cur) => {
	return {
		type: FETCH_CUR_SUCCESS,
		payload: data[base_cur],
		baseCur: base_cur
	}
}

export const fetchCurFailure = (error) => {
	return {
		type: FETCH_CUR_FAILURE,
		payload: error
	}
}

export const fetchData = (base_cur = 'rub') => {
	return (dispatch) => {
		dispatch(fetchCurRequest());
		fetch(BASE_URL + base_cur + '.json')
			.then(req => req.json())
			.then(data => {
				dispatch(fetchCurSuccess(data, base_cur));
			})
			.catch(error => {
				dispatch(fetchCurFailure(error));
			})
	}
}


const initialState = {
	loading: false,
	currencies: [],
	base: 'rub',
	error: '',
}

export const currenciesReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CUR_REQUEST:
			return {
				...state,
			}
		case FETCH_CUR_SUCCESS:
			return {
				...state,
				loading: true,
				currencies: action.payload,
				base: action.baseCur,
				error: ''
			}
		case FETCH_CUR_FAILURE:
			return {
				currencies: [],
				error: action.payload
			}
		default: return state
	}
}
