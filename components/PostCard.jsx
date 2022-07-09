import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import {AiOutlineCalendar} from 'react-icons/ai'

const PostCard = ({post}) => {

    const {featurePhoto: img, createdAt: date, author} = post;
    const {photo: authorPhoto, name: authorName} = author;


    return (
        <div className=" shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8" style={{backgroundColor: 'rgb(208 250 250)'}}>
            <div className="rounded-lg relative overflow-hidden shadow-md pb-16 mb-6">
                <Image width={740} height={320}
                       className='object-center h-80 absolute w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'
                       src={img.url}
                       alt={post.title}
                />


                    <Link href={`post/${post.slug}`}>
                        <h2 className="transition duration-700 text-center text-3xl font-semibold hover:cursor-pointer
                        hover:text-rose-700 my-5">
                            {post.title}
                        </h2>
                    </Link>




                <div className='flex justify-center items-center'>
                    <div className='flex text-center mr-8 justify-center items-center'>
                        <div>
                            <Image className='rounded-full' src={authorPhoto.url} alt={authorName} width={30}
                                   height={30}/>
                        </div>
                        <h2 className='ml-2 text-sm'>{authorName}</h2>
                    </div>

                    <div className='flex items-center justify-center'>
                        <AiOutlineCalendar className='text-rose-500'/>
                        <span className='text-sm ml-2'>{moment(date).format('MMM.DD.YYYY')}</span>
                    </div>
                </div>


                <p className='px-5 mt-8 text-gray-700 text-justify'>{post.excerpt}</p>


                <div className='text-center mt-8'>
                    <Link href={`/post/${post.slug}`}>
                        <button className='transition duration-500 cursor-pointer hover:-translate-y-1 hover:bg-rose-700
                        bg-rose-600 text-white py-2 px-4 rounded-full'>Continue reading
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default PostCard;
