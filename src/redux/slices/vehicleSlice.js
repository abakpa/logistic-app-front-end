import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    vehicles: [],
    loading: false,
    error:null,
};

const vehicleSlice = createSlice({
    name:'vehicles',
    initialState,
    reducers:{
        fetchVehicleRequest:(state)=>{
            state.loading = true
        },
        fetchVehicleSuccess:(state,action)=>{
            state.vehicles= action.payload;
            state.loading=false
        },
        fetchVehicleFailure:(state,action)=>{
            state.error = action.payload
        },
        createVehicleRequest:(state)=>{
            state.loading=true
        },
        createVehicleSuccess:(state,action)=>{
            state.vehicles.push(action.payload)
            state.loading=false
        },
        createVehicleFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {fetchVehicleRequest,fetchVehicleSuccess,fetchVehicleFailure,createVehicleRequest,createVehicleSuccess,createVehicleFailure} = vehicleSlice.actions

export default vehicleSlice.reducer