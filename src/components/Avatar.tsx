import React from 'react'
import ImageKitMedia  from './ImageKitMedia'

export default function Avatar() {
  return (
    <div className=" w-10 h-10 rounded-full relative overflow-hidden ">
    <ImageKitMedia type='image' src="general/avatar.png" alt='user image' fill/>
 </div>
  )
}
