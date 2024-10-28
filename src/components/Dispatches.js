import React,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {fetchDispatchRequest} from '../redux/slices/dispatchSlice'

const Dispatches = () => {
    const dispatch = useDispatch()
    const {dispatches, loading,error} = useSelector((state)=>state.dispatch)

    useEffect(()=>{
        dispatch(fetchDispatchRequest())
    },[dispatch])

    if(loading)return <p>Loading dispatched orders...</p>
    if(error)return <p>Error:{error}</p>

    return(
        <div>
            <h2>Dispatch</h2>
            <ul>
                {dispatches.map((dispatch)=>(
                    <li key={dispatch._id}>{dispatch.status}</li>
                ))}
            </ul>
        </div>
    )
}

export default Dispatches