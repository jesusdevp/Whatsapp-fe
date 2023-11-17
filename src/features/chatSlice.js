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
    notifications: [],
    files: []
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

    const { token, receiver_id, isGroup } = values

    try {
        
        const { data } =  await axios.post( CONVERSATION_ENDPOINT,
            { receiver_id, isGroup },
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

export const sendMessage = createAsyncThunk('message/send', async (values, { rejectWithValue }) => {

    const { token, message, conver_id, files} = values

    try {
        
        const { data } =  await axios.post( MESSAGE_ENDPOINT,
            { message, conver_id, files },
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

export const createGroupConversation = createAsyncThunk(
    'conversation/create_group',
    async (values, { rejectWithValue }) => {
      const { token, name, users } = values;

      try {

        const { data } = await axios.post(
          `${CONVERSATION_ENDPOINT}/group`,
          { name, users },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.error.message);
      }
    }
  );

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveConversation: (state, action) => {
            state.activeConversation = action.payload
        },
        updateMessagesAndConversations: (state, action) => {
            //update messages
            let conver = state.activeConversation;
            if(conver._id === action.payload.conversation._id) {
                state.messages = [...state.messages, action.payload]
            }
            // update conversation
            let conversation = { ...action.payload.conversation, latestMessage: action.payload }
            let newConvers = [ ...state.conversations ].filter(
                (c) => c._id !== conversation._id
            )
            newConvers.unshift(conversation);
            state.conversations = newConvers
        },
        addFiles: (state, action) => {
            state.files = [ ...state.files, action.payload ]
        },
        clearFiles: (state, action) => {
            state.files = []
        },
        removeFiles: (state, action) => {
            let index = action.payload
            let files = [...state.files]
            let fileToRemove = [files[index]]
            state.files= files.filter((file) => !fileToRemove.includes(file))
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
            state.activeConversation = action.payload,
            state.files = []
        })
        builder.addCase(openCreateConversation.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.payload,
            state.files = []
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
        builder.addCase(sendMessage.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.status = 'succeded',
            state.messages = [ ...state.messages, action.payload ];
            let conversation = { ...action.payload.conversation, latestMessage: action.payload }
            let newConvers = [ ...state.conversations ].filter(
                (c) => c._id !== conversation._id
            )
            newConvers.unshift(conversation);
            state.conversations = newConvers
            state.files = []
        })
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.payload
        })
    }
})

export const { 
    setActiveConversation, 
    updateMessagesAndConversations, 
    addFiles,
    clearFiles,
    removeFiles
} = chatSlice.actions

export default chatSlice.reducer