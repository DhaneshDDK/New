export const durationCalc = (course)=>{
   //  console.log(course);
    let val = 0;
    course.courseContent.map((section)=>{
        section.subSection.map((subsection)=>{
           val += parseFloat(subsection.timeDuration);
        })
       // console.log(section)
    })
   
   // console.log(val);
   return val;
 }