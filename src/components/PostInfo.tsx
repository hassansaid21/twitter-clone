'use client'

import ImageKit from "./ImageKit"

export default function PostInfo() {
  return (
    <div className="cursor-pointer relative w-5 h-5 p-4 rounded-full hover:bg-bgHover ">
    <ImageKit src="icons/infoMore.svg" alt="morenInfo icon" fill />
    </div>
  )
}
