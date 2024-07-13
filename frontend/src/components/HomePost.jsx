import React from 'react'
import {IF} from '../url'

function HomePost({post}) {
  return (
    <div>
      <div className='h-[45vh] flex flex-wrap bg-white border-gray-200 shadow  '>
        <div className='overflow-hidden h-[20vh] '>
          <img className="object-fit w-96 hover:scale-150 " src={IF+post.photo} alt="" />
          <div className="pl-3">
            <h5 className='text-xl font-bold tracking-tight text-gray-900  '>
              {post.title}
            </h5>

          <div className=' text-xs font-semibold text-gray-500 items-center justify-center flex '>
            <p className='text-blue-400'>By {post.username}</p>
          </div>
          <div className="mt-2 font-normal text-gray-700">
            <p>{post.desc.slice(0,75)+"...Read More"} </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePost