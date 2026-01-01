'use client'

import ImageKit from "./ImageKit"

export default function PostInfo() {
  return (
    <div className="cursor-pointer relative w-4 h-4 ">
   <ImageKit   src="icons/infoMore.svg" alt='more-info' width={16} height={16} />
    </div>
  )
}
