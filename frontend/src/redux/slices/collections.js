import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchCollections = createAsyncThunk('collections/fetchCollections', async () => {
  const {data} = await axios.get('/collections')
  return data
})

const initialState = {
  collections: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  }
}

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCollections.pending]: (state) => {
      state.collections.items = []
      state.collections.status = 'loading'
    },
    [fetchCollections.fulfilled]: (state, action) => {
      state.collections.items = action.payload
      state.collections.status = 'loaded'
    },
    [fetchCollections.rejected]: (state) => {
      state.collections.items = []
      state.collections.status = 'error'
    },
  }
})

export const collectionsReducer = collectionsSlice.reducer