import React from 'react'
import ImageKit from './ImageKit'

export default function Avatar() {
  return (
    <div className=" w-10 h-10 rounded-full relative overflow-hidden ">
    <ImageKit src="general/avatar.png" alt='user image' fill/>
 </div>
  )
}
