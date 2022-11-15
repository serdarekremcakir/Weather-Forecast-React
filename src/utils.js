import store from "./stores";
import { fetchWeather, resetState, setApiUrl, setCity } from "./stores/api";


export const setApiKey =  (url) => {
    store.dispatch(setApiUrl(url))
}

export const getWeatherData =  (targetUrl) => {
     store.dispatch(fetchWeather(targetUrl));
}

export const setCityUtils = (city) => {
    store.dispatch(setCity(city));
}

export const clearState = () => {
    store.dispatch(resetState());
}

