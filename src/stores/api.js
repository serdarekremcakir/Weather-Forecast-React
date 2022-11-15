const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    data: '',
    dataCurrent: '',
    error: "",
    loading: false,
    apiUrl: '',
    sessionKey: sessionStorage.getItem('apikey') || false,
    city: [],
}

export const fetchWeather = createAsyncThunk("fetchWeather", async (target, { getState, rejectWithValue }) => {
    const apiState = getState().api;
    let url = '';
    if (target === 'current') {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${apiState.city.latitude || '41.0053'}&lon=${apiState.city.longitude || '28.9770'}&lang=tr&units=metric&appid=${apiState.apiUrl || apiState.sessionKey}`
    }
    else {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${apiState.city.latitude || '41.0053'}&lon=${apiState.city.longitude || '28.9770'}&lang=tr&units=metric&appid=${apiState.apiUrl || apiState.sessionKey}`
    }


    try {
        const response = await fetch(url);
        if (!response.ok) {
            // return rejectWithValue(response.statusText);
            return rejectWithValue("Geçersiz api key!");

        }
        const result = await response.json();
        return {result,target};

    }
    catch (error) {
        // throw rejectWithValue(error.message);
        throw rejectWithValue("API kaynaklı bir hata yaşanmaktadır. Lütfen daha sonra tekrar deneyin!");

    }

})

const api = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setApiUrl: (state, action) => {
            state.apiUrl = action.payload;
        },
        setCity: (state, action) => {
            state.city = action.payload
        },
        resetState: (state, action) => {
            state.data = '';
            state.error = "";
            state.loading = false;
            state.apiUrl = '';
            state.sessionKey = sessionStorage.getItem('apikey') || false;
            state.city = []
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state, action) => {
            state.loading = true;
            state.error = "Yukleniyor";
        });

        builder.addCase(fetchWeather.fulfilled, (state, action) => {


            if (action.payload.target) {
                state.dataCurrent = action.payload.result
            }
            else {
                state.data = action.payload.result
            }

            state.loading = false;

            //Şehirler veya şehir detay ekranında sayfa yenilendiğinde apiUrl değer döndürmüyor. Sayfa yenilendikten sonra apiye bir istek daha atıldığında istek sessionstorage'dan atılıyor fakat istek başarılı olup bu alana girdiğinde sessionstorage apiUrl ile güncelleniyordu. Bu durumun önüne geçmek için if bloğu
            if (state.apiUrl) {
                sessionStorage.setItem('apikey', state.apiUrl);
                state.sessionKey = state.apiUrl;
            }

            state.error = '';
        });

        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
            state.data = '';
            state.apiUrl = '';
        })
    }
})

export const { setApiUrl, setCity, resetState } = api.actions;
export default api.reducer