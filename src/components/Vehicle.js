import React,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {fetchVehicleRequest} from '../redux/slices/vehicleSlice'

const Vehicle = () =>{
    const dispatch = useDispatch()
    const {loading,vehicles,error} = useSelector((state)=>state.vehicle)

    useEffect(()=>{
        dispatch(fetchVehicleRequest())
    },[dispatch])
if(loading)return <p>Loading...</p>
if(error)return <p>Error: {error}</p>
    return(
        <div className="min-h-screen p-6 md:p-24 bg-gray-100">
             <h2 className="text-2xl font-bold mb-6 text-center">List of Vehicles</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b text-left">Type</th>
              <th className="py-3 px-4 border-b text-left">Capacity</th>
              <th className="py-3 px-4 border-b text-left">License Plate</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No vehicles available
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-left">{vehicle.type}</td>
                  <td className="py-2 px-4 border-b text-left">{vehicle.capacity}</td>
                  <td className="py-2 px-4 border-b text-left">{vehicle.license_plate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    )
}

export default Vehicle