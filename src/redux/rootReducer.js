import { combineReducers } from "redux";
import { currenciesReducer } from "./currencyList";

const rootReducer = combineReducers({
	currencies: currenciesReducer
})

export default rootReducer