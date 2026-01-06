'use client'
import React, { useState } from 'react'
import ImageKit from './ImageKit'
import Avatar from './Avatar'
import { sharePost } from '@/actions'

export default function Share() {
  const [media, setMedia] = useState<File | null>(null)
  console.log(media)
  const handleMediaChange =(e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file) {
      setMedia(file)
    }
  }
  return (
    <form action={sharePost}  className='border-[1px]  border-borderGray flex  p-4 gap-4'>
       <Avatar />

        <div className="flex flex-1 flex-col justify-center gap-4 ">
            <input name='desc' type="text" placeholder='What is hapenning?!' className='bg-transparent outline-none placeholder:text-textGray text-[18px] '  />
            <hr className='border-borderGray' />
            <div className=" flex gap-16 justify-between">
              <div className="flex flex-1 gap-4 items-center">
                <input hidden type="file" accept='image/*' id='image-input' name='media' onChange={handleMediaChange}   />
                <label htmlFor='image-input'>
                  <ImageKit src='icons/image.svg'  alt='' className='cursor-pointer'  width={20}  height={20 } />
                </label>
              <ImageKit src='icons/image.svg'  alt='' className='cursor-pointer'  width={20}  height={20 } />
              <ImageKit src='icons/gif.svg'  alt='' className='cursor-pointer'  width={20}  height={20 } />
              <ImageKit src='icons/poll.svg'  alt='' className='cursor-pointer'  width={20}  height={20 } />
              <ImageKit src='icons/emoji.svg'  alt='' className='cursor-pointer'  width={20}  height={20 } />
              <ImageKit src='icons/schedule.svg'  alt='' className='cursor-pointer'  width={20}  height={20 } />
              <ImageKit src='icons/location.svg'  alt='' className='cursor-pointer'  width={20}  height={20 } />
              </div>
              <button className='bg-white  rounded-full font-bold text-black  py-2 px-4 '>post  

              </button>
            </div>

        </div>
    </form>
  )
}
