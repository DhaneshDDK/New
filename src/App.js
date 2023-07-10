import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Common/Navbar'
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import VerifyEmail from './Pages/VerifyEmail';
import ForgotPassword from './Pages/ForgetPassword';
import UpdatePassword from './Pages/updatePassword';
import About from './Pages/About';
import OpenRoute from './Components/Core/Auth/OpenRoute';
import PrivateRoute from './Components/Core/Auth/PrivateRoute';
import Contact from './Pages/Contact';
import Dashboard from './Pages/Dashboard';
import MyProfile from './Components/Core/Dashboard/MyProfile';
import { useSelector } from 'react-redux';
import Cart from './Components/Core/Dashboard/Cart/Cart';
import EnrolledCourses from './Components/Core/Dashboard/EnrolledCourses';
import Settings from './Components/Core/Dashboard/Settings/Settings';
import { ACCOUNT_TYPE } from './utils/constants';
import AddCourse from './Components/Core/Dashboard/AddCourse/AddCourse';
import MyCourses from './Components/Core/Dashboard/AddCourse/MyCourses';
import EditCourse from './Components/Core/Dashboard/AddCourse/EditCourse/EditCourse';
import Catalog from './Pages/Catalog';
import Error from './Components/Common/Error';
import CourseDetails from './Pages/CourseDetails';
import ViewCourse from './Pages/ViewCourse';
import VideoDetails from './Components/Core/ViewCourse/VideoDetails';
import InstructorDashboard from './Components/Core/Dashboard/InstructorDashboard.jsx/InstructorDashboard';

function App() {
  const {user} = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

           <div className='fixed z-10 bg-richblack-900 w-[100%]'><Navbar/></div>
           <div className='w-100vw h-16' ></div>

           <Routes>
             <Route path="/" element={  <Home/>  }/>
             <Route path="catalog/:catalogName" element={<Catalog/>} />
             <Route path="courses/:courseId" element={<CourseDetails/>} />
             <Route path="/login" element={ <OpenRoute> <Login/> </OpenRoute>}/>
             <Route path="/signup" element={ <OpenRoute> <SignUp/> </OpenRoute>}/>
             <Route path="/verify-email" element={ <OpenRoute> <VerifyEmail/>  </OpenRoute>}/>
             <Route path="/forgot-password" element={ <OpenRoute> <ForgotPassword/> </OpenRoute>}/>
             <Route path="/update-password/:id" element={<OpenRoute> <UpdatePassword/> </OpenRoute>}/>
             <Route path="/about" element={<About/>}/>
             <Route path="/contact" element={<Contact />} />
             <Route element={<PrivateRoute> <Dashboard/> </PrivateRoute>}>
                    <Route path="/dashboard/my-profile" element={<MyProfile />} />
                    <Route path="dashboard/Settings" element={<Settings />} />

                    {
                        user?.accountType === ACCOUNT_TYPE.STUDENT && (
                          <>
                          <Route path="dashboard/cart" element={<Cart />} />
                          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                          </>
                        )
                      }

                    {
                      user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                        <>
                        <Route path="dashboard/add-course" element={<AddCourse />} />
                        <Route path="dashboard/my-courses" element={<MyCourses />} />
                        <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
                        <Route path="dashboard/instructor" element={<InstructorDashboard />} />
                        </>
                      )
                    }


             </Route>

                 
     <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
        )
      }

      </Route>

          

              

             <Route path="*" element={<Home/>}/>
           </Routes>
           

    </div>
  );
}

export default App;
