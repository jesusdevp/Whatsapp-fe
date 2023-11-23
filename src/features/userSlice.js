import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_ENDPOINT =`${ import.meta.env.VITE_API_ENDPOINT }/auth`

const initialState = {
    status: '',
    error: '',
    user: {
        id: '',
        name: '',
        email: '',
        picture: '',
        token: '',
        status: ''
    },
    toggle: '',
    isOpenModal: null
}

export const registerUser = createAsyncThunk('auth/register', async( values, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${ AUTH_ENDPOINT }/register`, {
            ...values
        })

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})

export const loginUser = createAsyncThunk('auth/login', async( values, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${ AUTH_ENDPOINT }/login`, {
            ...values
        })

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})

export const checkTokenUser = createAsyncThunk('auth/refreshtoken', async (token, { rejectWithValue }) => {

    try {
        
        const { data } = await axios.post(`${ AUTH_ENDPOINT }/refreshtoken`, {
            token
        })

        return data

    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }

})

export const logoutUser = createAsyncThunk('auth/logout', async( _, { rejectWithValue } ) => {

    try {
        
        const { data } = await axios.post(`${ AUTH_ENDPOINT }/logout`)

        return data;
        

    } catch (error) {
        return rejectWithValue(error.response)
    }


})

export const checkEmailUser = createAsyncThunk('auth/checkemail', async(email, { rejectWithValue }) => {

    try {
        
        const { data } = await axios.post(`${ AUTH_ENDPOINT }/checkemail`, {
            email
        })

        return data;
        

    } catch (error) {
        return rejectWithValue(error.response)
    }

})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: ( state ) => {
            state.status = '';
            state.error = '';
            state.user = {
                id: '',
                name: '',
                email: '',
                picture: '',
                token: '',
                status: ''
            };
        },
        changeStatus: ( state, action ) => {
            state.status = action.payload
        },
        resetError: (state) => {
            state.error = ''
        },
        changeToggle: (state, action) => {
            state.toggle = action.payload
        },
        openModal: (state, action) => {
            state.isOpenModal = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(registerUser.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.status = 'succeeded',
            state.error = ''
            state.user = action.payload.user,
            state.toggle = '',
            state.isOpenModal = null
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.payload
        })
        .addCase(loginUser.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded',
            state.error = ''
            state.user = action.payload.user,
            state.toggle = '',
            state.isOpenModal = null
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.payload
        })
        .addCase(checkTokenUser.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(checkTokenUser.fulfilled, (state, action) => {
            state.status = 'succeeded',
            state.error = '',
            state.user = action.payload.user
            state.toggle = '',
            state.isOpenModal = null
        })
        .addCase(checkTokenUser.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.payload
        })
        .addCase(checkEmailUser.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.payload
        })
    }
})

export const { logout, changeStatus, resetError, changeToggle, openModal } = userSlice.actions;

export default userSlice.reducer;