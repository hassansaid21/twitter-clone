

import Share from "./components/Share";
import Feed from "./components/Feed";
import Link from "next/link";


const Homepage = () => {
  
   return (<div className="flex flex-col ">
    <div className=" flex  text-textGray border-borderGray border-b-[1px] font-bold text-center">
      
        <Link  className="flex-1 py-4  hover:bg-gray-500/20" href='/'> 
    <span className="border-b-4 py-4  px-1 text-white border-iconBlue">For You
    </span>    </Link>
      

      <Link  className="flex-1 py-4 hover:bg-gray-500/20 " href='/'>
      <span className=" py-4 px-1  ">Following</span>  
      </Link>
      <Link className="flex-1 py-4    hover:bg-gray-500/20 " href='/'>
      <span className=" py-4 px-1 ">React.js</span>  
      </Link>
      <Link className="flex-1 py-4    hover:bg-gray-500/20 " href='/'>
      <span className=" py-4 px-1 ">Javascript</span>  
      </Link> <Link className="flex-1 py-4    hover:bg-gray-500/20 " href='/'>
      <span className=" py-4 px-1 ">  CSS</span>  
      </Link>

    </div>
   <Share />
   <Feed />

 </div> )

}


export default Homepage