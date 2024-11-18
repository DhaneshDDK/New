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
import { useLocation } from 'react-router-dom'
import {TbLogout} from 'react-icons/tb'
import {CgProfile} from 'react-icons/cg'
import ConfirmationModal from './ConfirmationModal'
import { logout } from '../../Services/Operations/authAPI'
import {AiFillHome} from 'react-icons/ai'
import {FcAbout} from 'react-icons/fc'
import {LuContact} from 'react-icons/lu'
import {IoMdLogIn} from 'react-icons/io'
import {SiGnuprivacyguard} from 'react-icons/si'

 
const IniCatalog = ["Python", "Web development",];

const Navbar = () => {
//    const {token} = useSelector((state) => state.auth); console.log(token);
   const {user} = useSelector( (state) => state.profile);
   const {totalItems} = useSelector( (state) => state.cart );
   const [isOpen, setOpen] = useState(false);
   const [isOpenProfile, setOpenProfile] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
    // console.log(user); 
    // localStorage.clear();     console.log(user); 
//    console.log(user)

   const [catalog, setCatalog] = useState(IniCatalog);
   const [smMenu, setSmMenu] = useState(false);
   const [confirmationModal, setConfirmationModal] = useState(null);  

    async function fetchFunc(){
        const result = await apiConnector('get', categories.CATEGORIES_API);
        setCatalog(result.data.data);
    }
    useEffect(()=>{
          fetchFunc();
    },[])

    useEffect(()=>{
        setOpen(false)
    },[location.pathname])

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
                                          catalog?.length > 0 ? catalog?.map((link,idx)=> 
                                              <Link onClick={()=>{ setClicked(true)}} key={idx} to={`/catalog/${String(link.name).split("-").join('').split(" ").join('')}`}>
                                              {String(link.name).split("-").join(' ')}</Link>
                                           ) : <div className = "text-white"> Loading.... </div>

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
                
            <div className='md:hidden'> 
                    <Hamburger color='white'  toggled={isOpen} toggle={setOpen} /> 
                    <div className={`md:hidden flex flex-col px-10 gap-5 text-2xl items-start py-10  mx-auto right-[0%] translate-y-3 rounded-lg  bg-richblack-900 text-white z-10 absolute ${isOpen? "block" : "hidden"} `}>
                       
                    <Link onClick={()=>setOpenProfile(false)} to={'dashboard/my-profile'} className='flex items-center gap-3 hover:text-caribbeangreen-200'> <CgProfile size={30} color='green'/> <div className='border-b border-dotted border-pure-greys-100 '>My Profile</div></Link>


                    {
              NavbarLinks.map((link,idx)=>{
                  return <div key={idx}>
                  { (link.title === 'Catalog') ? (
                    <div className= {`${clicked ? " text-yellow-25" : " text-richblack-25" } flex flex-col items-center gap-1 justify-start cursor-pointer relative group z-10 `}
                    onClick={()=> setSmMenu(!smMenu)}> 

                             <div className='flex gap-x-3 items-center'>  
                                 <IoIosArrowDropdownCircle size={28} color='green'/>  <div className='border-b border-dotted border-pure-greys-100'> Catalog</div>  </div> 

                           {  smMenu &&   <div className={`flex mt-3 flex-col gap-2 items-center border p-4 rounded-md bg-caribbeangreen-100 text-white`}>
                              
                                    {
                                          catalog?.length > 0 && catalog?.map((link,idx)=> 
                                              <Link onClick={()=>{ setClicked(true)}} key={idx} to={`/catalog/${String(link.name).split("-").join('').split(" ").join('')}`}>
                                              {String(link.name).split("-").join(' ')}</Link>
                                           ) 

                                    }
                                    
                               </div>
                           }
                    
                    </div>) : 
                       <NavLink key={idx} onClick={()=>{ setClicked(false)}} to={link?.path}> <div className='flex items-center gap-3'>
                        {link.title === 'Home' &&  <AiFillHome  size={28} color='green'/> }   
                        {link.title === 'About Us' &&  <FcAbout  size={28} color='green'/> }   
                        {link.title === 'Contact Us' &&  <LuContact  size={28} color='green'/> }   
                        
                         <div className='border-b border-dotted border-pure-greys-100'>   {link.title}  </div> </div></NavLink>
                  }
                  </div>
                  })
             }




             {
                (user === null) && (
                    <Link to="/login">
                    <div className='flex gap-x-3 items-center'>  
                                 <IoMdLogIn size={28} color='green'/>  <div className='border-b border-dotted border-pure-greys-100'> Login</div>  </div>
                    </Link>
                )
            }

            {
                user === null && (
                    <Link to="/signup">
                    <div className='flex gap-x-3 items-center'>  
                                 <SiGnuprivacyguard size={28} color='green'/>  <div className='border-b border-dotted border-pure-greys-100'>Sign Up</div>  </div>
                   
                    </Link>
                )
            }
             <div className='flex items-center gap-3 hover:text-caribbeangreen-200'  onClick={() =>
              {setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => (logout(navigate,dispatch)),
                btn2Handler: () => setConfirmationModal(null),
              }); }
            }> 
            <TbLogout size={28} color='green'/> <div className='border-b border-dotted border-pure-greys-100'>Logout</div>
          
            </div>

                    </div>

              
           
                    
            </div>    

       </div>

       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      
    </div>
  )
}

export default Navbar
