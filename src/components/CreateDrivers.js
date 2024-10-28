import React, {useState,useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createDriverRequest } from '../redux/slices/driverSlice'
import {fetchUsersRequest} from '../redux/slices/userSlice'
import {fetchVehicleRequest} from '../redux/slices/vehicleSlice'



const CreateDrivers = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectedUser,setSelectedUser] = useState("")
    const [selectedVehicle,setSelectedVehicle] = useState("")
    const {users} = useSelector((state)=>state.users)
    const {error} = useSelector((state)=>state.driver)
    const {vehicles} = useSelector((state)=>state.vehicle)
    

    const handleUserChange = (e)=>{
        setSelectedUser(e.target.value)
    }
    const handleVehicleChange = (e)=>{
        setSelectedVehicle(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const details = {user_id:selectedUser,vehicle_id:selectedVehicle}
        const data ={details,navigate}
        dispatch(createDriverRequest(data))
    }
    useEffect(()=>{
        dispatch(fetchUsersRequest())
    },[dispatch])
    useEffect(()=>{
        dispatch(fetchVehicleRequest())
    },[dispatch])
if(error)return <p>{error}</p>
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Create New Driver</h2>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Select User */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Select User</label>
              <select
                name="selectedUser"
                value={selectedUser}
                onChange={handleUserChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Select Vehicle */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Vehicle</label>
              <select
                name="selectedVehicle"
                value={selectedVehicle}
                onChange={handleVehicleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.type} ({vehicle.license_plate})
                  </option>
                ))}
              </select>
            </div>
  
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Driver
              </button>
            </div>
          </form>
        </div>
      </div>
   
    )
}
export default CreateDrivers