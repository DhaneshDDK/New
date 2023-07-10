import React from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, NavLink } from 'react-router-dom'
import NavbarLinks from '../../data/navbar-links'
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropDown from '../Core/Auth/ProfileDropDown'
import { useState } from "react";
import { useEffect } from "react";
import apiConnector from '../../Services/apiConnector'
import { categories } from '../../Services/Operations/apis'
import Hamburger from 'hamburger-react'
import {BsSearch}from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {MdArrowDropDown} from 'react-icons/md'
import {MdArrowDropUp} from 'react-icons/md'

 
const IniCatalog = ["Python", "Web development",];

const Navbar = () => {
//    const {token} = useSelector((state) => state.auth); console.log(token);
   const {user} = useSelector( (state) => state.profile);
   const {totalItems} = useSelector( (state) => state.cart );
   const [isOpen, setOpen] = useState(false);
   const [isOpenProfile, setOpenProfile] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();
    // console.log(user); 
    // localStorage.clear();     console.log(user); 
//    console.log(user)

   const [catalog, setCatalog] = useState(IniCatalog);

    async function fetchFunc(){
        const result = await apiConnector('get', categories.CATEGORIES_API);
        setCatalog(result.data.data);
    }
    useEffect(()=>{
          fetchFunc();
    },[])

    useEffect(()=>{
        setOpenProfile(false);
    },[user])

   const [clicked, setClicked] = useState(false);

  return (
    <div className='flex h-16 items-center justify-center border-b-[1px] border-b-richblack-700'>

       <div className='flex w-11/12 max-w-maxContent items-center justify-between relative'>
            <Link to="/"> <img src={logo} alt="This is logo" />  </Link> 

            <div className='gap-x-6 text-richblack-25 text-md font-medium hidden lg:flex'>
             {
              NavbarLinks.map((link,idx)=>{
                  return <div key={idx}>
                  { (link.title === 'Catalog') ? (
                    <div className= {`${clicked ? " text-yellow-25" : " text-richblack-25" } flex items-center gap-1 justify-center cursor-pointer relative group z-10 `}> 

                                  Catalog 

                                 <IoIosArrowDropdownCircle/>

                               <div className='invisible absolute flex flex-col gap-5
                                    translate-y-10
                                 top-[10%] rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 w-[270px]'>
                              
                               <div className='absolute left-[50%] top-0
                                translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>
                                    {
                                          catalog?.length > 0 && catalog?.map((link,idx)=> 
                                              <Link onClick={()=>{ setClicked(true)}} key={idx} to={`/catalog/${String(link.name).split("-").join('').split(" ").join('')}`}>
                                              {String(link.name).split("-").join(' ')}</Link>
                                           ) 

                                    }
                                    
                               </div>
                    
                    </div>) : 
                  <NavLink key={idx} onClick={()=>{ setClicked(false)}} to={link?.path}>{link.title}</NavLink>
                  }
                  </div>
                  })
             }
            </div>

            <div className='gap-x-4 items-center justify-center hidden md:flex'>
    
                  {
                    user && (  <div className=' cursor-pointer'> <BsSearch color='white' size={17}/> </div>)
                  }
            {
                user && user?.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className='relative text-richblack-5'>
                        <AiOutlineShoppingCart color='white' size={20}/>
                        {
                            totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                    
                )
            }

             {
                user && (
                        <div className='cursor-pointer relative flex items-center justify-center'>
                        <img className=' rounded-full w-[35px] h-[35px]' onClick={()=>setOpenProfile(!isOpenProfile)} 
                        src={(user?.image) ?? `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`} alt="" />
                         {  isOpenProfile && <ProfileDropDown navigate={navigate} dispatch={dispatch} setOpenProfile={setOpenProfile}/>
                         }
                         <div onClick={()=>setOpenProfile(!isOpenProfile)}>
                           {!isOpenProfile && <MdArrowDropDown color='white' size={25}  />}
                           {isOpenProfile && <MdArrowDropUp color='white' size={25}  />}
                         </div>
                        </div>  
                ) 
             }

            {
                (user === null) && (
                    <Link to="/login">
                        <button className='border hover:shadow-none border-richblack-700 bg-richblack-400 px-[12px] py-[8px] text-richblack-5 transition-all duration-200 ease-linear rounded-md bg-opacity-30'>
                            Log in
                        </button>
                    </Link>
                )
            }

            {
                user === null && (
                    <Link to="/signup">
                        <button  className='border hover:shadow-none border-richblack-700 bg-richblack-400 px-[12px] py-[8px] text-richblack-5 transition-all duration-200 ease-linear rounded-md bg-opacity-30 '>
                            Sign Up
                        </button>
                    </Link>
                )
            }

          
            </div>
                
            <div className='md:hidden'> <Hamburger color='white'  toggled={isOpen} toggle={setOpen} /> 
                    <div className={`h-[40em] md:hidden w-[90vw]  md:w-[80vw] mx-auto left-[50%] translate-y-3 rounded-lg translate-x-[-50%] bg-blue-300 z-10 absolute ${isOpen? "block" : "hidden"} `}></div>
            </div>    

       </div>

      
      
    </div>
  )
}

export default Navbar
