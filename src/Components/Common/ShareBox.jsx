import React from 'react'
import { useState } from 'react';

const ShareBox = () => {
     const [animation, setAnimation] = useState(false);
     setTimeout(()=>{
        setAnimation(true);
     },1);
  return (
    <div className='relative w-[100vw] mx-auto'>
        
        <div className="absolute -top-[60%] left-[10%] w-[11em] h-[11em] rounded-full circle1"></div>
        <div className="circle2"></div>
      
       { (animation)? <div className='z-5 flex w-[60vw] relative py-5 px-10 mx-auto items-center border-solid border-b-[#ffffff88] shadow-lg bg-black opacity-90 rounded-2xl flex-col gap-5 origin-top transition-all duration-100 ease-linear '>
                 <h1 id="share" class="text-white text-[28px]">How do u want to connect with us ?</h1>
                 <div className='h-[5px] w-[100%] bg-green-400'></div>

                 <div class="flex flex-row flex-wrap gap-10 text-white justify-evenly mt-[20px]">
                <a href="https://www.facebook.com/profile.php?id=100079241538210"  target='_blank' id="facebook" class="icon scale-125 border-[1px] border-solid border-[#1771e6] text-[#1771e6]"><i  class="fa-brands fa-facebook-f"></i></a>
                <a href="https://twitter.com/dande_dhanesh" target='_blank' id="twitter" class="icon scale-125 border-[1px] border-solid border-[#1c99e6] text-[#1c99e6]"><i  class="fa-brands fa-twitter"></i></a>
                <a href="https://www.instagram.com/dhanesh_901/?next=%2F"  target='_blank'id="instagram" class="icon scale-125 border-[1px] border-solid border-[#cb2770] text-[#cb2770]"><i  class="fa-brands fa-instagram"></i></a>
                <a href="https://wa.me/9381263541" target='_blank' id="whatsapp" class="icon scale-125 border-[1px] border-solid border-[#2fe664] text-[#2fe664]"><i  class="fa-brands fa-whatsapp"></i></a>
                <a href="https://web.telegram.org/k/" target='_blank' id="telegram" class="icon scale-125 border-[1px] border-solid border-[#0081c2] text-[#0081c2]"><i  class="fa-brands fa-telegram"></i></a>
            </div>
        </div> : <div></div>}
        

       {/* <div>Hi Hellos</div> */}

    </div>
  )
}

export default ShareBox;
