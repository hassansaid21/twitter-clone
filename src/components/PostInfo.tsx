'use client'

import ImageKit from "./ImageKit"

export default function PostInfo() {
  return (
    <div className="cursor-pointer relative w-10 h-10 p-2 rounded-full hover:bg-bgHover ">
    <ImageKit src="icons/infoMore.svg" alt="morenInfo icon" fill />
    </div>
  )
}
