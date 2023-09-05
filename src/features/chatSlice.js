import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT =`${ import.meta.env.VITE_API_ENDPOINT }/conversation`
const MESSAGE_ENDPOINT =`${ import.meta.env.VITE_API_ENDPOINT }/message`

const initialState = {
    status: '',
    error: '',
    conversations: [],
    messages: [],
    activeConversation: {},
    notifications: []
}

export const getConversations = createAsyncThunk('conversation/all', async (token, { rejectWithValue }) => {
    try {
        
        const { data } =  await axios.get( CONVERSATION_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })

        return data;

    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})

export const openCreateConversation = createAsyncThunk('conversation/open_create', async (values, { rejectWithValue }) => {

    const { token, receiver_id } = values

    try {
        
        const { data } =  await axios.post( CONVERSATION_ENDPOINT,
            { receiver_id },
            {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            }
        )

        return data;

    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})

export const getConversationsMessages = createAsyncThunk('conversation/messages', async (values, { rejectWithValue }) => {

    const { token, conver_id } = values

    try {
        
        const { data } =  await axios.get( `${ MESSAGE_ENDPOINT }/${ conver_id }`,
            {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            }
        )

        return data;

    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveConversation: (state, action) => {
            state.activeConversation = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getConversations.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(getConversations.fulfilled, (state, action) => {
            state.status = 'succeded',
            state.conversations = action.payload
        })
        builder.addCase(getConversations.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.payload
        })
        builder.addCase(openCreateConversation.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(openCreateConversation.fulfilled, (state, action) => {
            state.status = 'succeded',
            state.activeConversation = action.payload
        })
        builder.addCase(openCreateConversation.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.payload
        })
        builder.addCase(getConversationsMessages.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(getConversationsMessages.fulfilled, (state, action) => {
            state.status = 'succeded',
            state.messages = action.payload
        })
        builder.addCase(getConversationsMessages.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.payload
        })
    }
})

export const { setActiveConversation } = chatSlice.actions

export default chatSlice.reducer