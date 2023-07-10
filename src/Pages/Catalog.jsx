import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import apiConnector from '../Services/apiConnector';
import { categories } from '../Services/Operations/apis';
import { getCatalogPageData } from '../Services/Operations/CatalogPageData';
import { useSelector } from 'react-redux';
import { ScaleLoader } from 'react-spinners';
import CourseSlider from '../Components/Core/Catalog/CourseSlider';
import CourseCard from '../Components/Core/Catalog/CourseCard';
import Footer from '../Components/Common/Footer';

const Catalog = () => {

    const {catalogName} = useParams();
    const [categoryId, setCategoryId] = useState("");
    const [catalogPageData, setCatalogPageData] = useState(null);
    const { loading } = useSelector((state) => state.profile)
    const [active, setActive] = useState(1);

    useEffect(()=>{
        
    async function fetchCategoryFunc(){
        const result = await apiConnector('get', categories.CATEGORIES_API);
        const currentCategory = result.data.data.filter((category)=> category.name.split("-").join('').split(" ").join('') === catalogName );
        setCategoryId(currentCategory[0]._id);
    }

        fetchCategoryFunc();
    },[catalogName])

    
    useEffect(() => {
        setCatalogPageData(null);
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("PRinting res: ", res.data);
                setCatalogPageData(res.data);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);



    if (!catalogPageData) {
        return (
            <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center'><ScaleLoader color='lime'/></div>
        )
      }


  return (
    <div >
          {/* Hero Section */}
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.selectedCategory?.description}
              </p>
            </div>
          </div>


          
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="text-2xl font-bold text-richblack-5 lg:text-4xl">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                courses={catalogPageData?.selectedCategory.courses}
                   type = { active }
              />
            </div>
          </div>


          {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="text-2xl font-bold text-richblack-5 lg:text-4xl">
              Top courses in {catalogPageData?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                courses={catalogPageData?.differentCategory?.courses} type = {3}
              />
            </div>
          </div>


      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="text-2xl font-bold text-richblack-5 lg:text-4xl">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
                {catalogPageData?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <CourseCard course={course} key={i} Height={"h-[250px]"} />
                  ))}
              </div>
            </div>
          </div>

    <Footer/>
    </div>
  )
}

export default Catalog
