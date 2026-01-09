'use client'
import ImageKitMedia from "./ImageKitMedia"

export default function PostInfo() {
  return (
    <div className="cursor-pointer  p-2 rounded-full hover:bg-bgHover ">
    <ImageKitMedia src="icons/infoMore.svg" alt="morenInfo icon" type="image" width={23} height={23} />
    </div>
  )
}
