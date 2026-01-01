'use client'

import Link from "next/link"
import ImageKit from "./ImageKit"

export default function PostInteractions() {
  return (
    <div className="flex items-center justify-between my-2 gap-2">
                <Link href='/comments'>
                <ImageKit  className="bg-white text-white" src="svg/comment.svg" alt='comment  icon' width={24} height={24}/>
                </Link>
                <ImageKit className="bg-white text-white" src="svg/repost.svg" alt='repost icon' width={24} height={24}/>
                <ImageKit className="bg-white text-white" src="svg/like.svg" alt='like icon'width={24} height={24}/>
                <ImageKit className="bg-white text-white" src="svg/share.svg" alt='share icon'width={24} height={24}/>
                 <div className="flex gap-2 items-center">
                 <ImageKit  src='icons/bookmark.svg' alt='bookmark icon' width={20}  height={20} />
                <ImageKit className="bg-white text-white"  src="svg/share.svg" alt='shareicon' width={20} height={20}/>
                
                 </div>
             
              </div>
  )
}
