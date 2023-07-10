import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import Sidebar from '../Components/Core/Dashboard/Sidebar'
import { setSideBar } from '../Redux/Slices/authSlice'
import { useDispatch } from 'react-redux'
import Hamburger from 'hamburger-react'
import { useState } from 'react'


const Dashboard = () => {
    const {loading  } = useSelector((state) => state.profile);
    const { sidebar } = useSelector((state) => state.auth );
    const [isOpen, setOpen] = useState(false)
    const dispatch = useDispatch();

    if(loading) return <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center'><ScaleLoader color='lime'/></div>
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] ">
        <div className={`${ sidebar? "block" : "hidden" } md:block absolute md:relative`}>  <Sidebar /> </div> 
      <div className="h-[calc(100vh-4rem)] w-[calc(100vh-210px)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] md:py-6">
        <div className={`md:hidden ${isOpen? "ml-[200px]" : "-ml-3"} mb-3 w-fit`} onClick={()=>dispatch(setSideBar(!isOpen))}> <Hamburger color='white' size={20}  toggled={isOpen} toggle={setOpen} /> </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
