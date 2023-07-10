import * as Icons from 'react-icons/vsc';
import { matchPath, useLocation , NavLink} from 'react-router-dom';

import React from 'react'

const SideBarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path : route}, location.pathname);
    }

  return (
    <div className='relative '>
       
       <NavLink to={link.path}
       className={({ isActive }) =>  isActive ? 'text-sm font-medium transition-all duration-200 bg-yellow-700 text-yellow-25 flex items-center gap-x-3 py-2 px-4' : 
       'relative text-sm font-medium transition-all duration-200 flex items-center gap-x-3 py-2 px-4' }
       >
        <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
        ></span>
                 
             <Icon className="text-lg" />
             <span>{link.name}</span>

       </NavLink>
       
    </div>
  )
}

export default SideBarLink;
