import React from "react";
import Image from "next/image";

const Author = ({author}) => {
  return <div className='bg-black bg-opacity-20 rounded-lg shadow-lg mb-8 mt-20 pt-14 pb-20 relative w-full'>

  <div className='absolute left-1/2 -translate-x-1/2 -top-14'>
    <Image className='rounded-full ' src={author.photo.url} alt={author.name} width={100} height={100} />
  </div>
    <div className='text-center text-white'><h3 className='text-xl font-semibold mb-5'>{author.name}</h3>
      <p className='text-sm'>{author.bio}</p></div>

  </div>;
};

export default Author;
