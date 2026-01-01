import Link from "next/link";
import ImageKit from "./ImageKit";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";




export default function Post() {
  return (
    <div className="flex gap-2 p-4 border-b-[1px] border-borderGray">

             <div className=" w-10 h-10 rounded-full relative overflow-hidden">
                <ImageKit src="general/avatar.png" alt='user image' fill/>
             </div>

            <div className="flex flex-1 flex-col gap-2 "> 
              <div className="flex  items-center  gap-2">            
                  <div className="flex gap-1  flex-wrap text-textGray">
                     <h2 className="text-white text-md font-bold">Karim Said</h2>
                     <span>@karim13  &apos;</span>
                     <span>25/12/2026</span>
                  </div>
                 <PostInfo />
              </div> 
             
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta molestiae doloremque nihil debitis sequi tempore, cupiditate at ducimus, natus nostrum harum, ab explicabo sit. Quam amet consequatur deleniti expedita omnis.</p>
              
              <div className="rounded-md border border-borderGray overflow-hidden">
                <ImageKit  src="general/post.jpeg" alt='post image' width={600} height={600} transformation={[{width:600 , height:600}]} />
              </div>
              <PostInteractions />
              </div>

    </div>
  )
}
