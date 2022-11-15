import { configureStore } from "@reduxjs/toolkit";

import api from './api';


const store = configureStore({
    reducer: {
        api,
    }
})

export default store