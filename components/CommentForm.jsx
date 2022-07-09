import React, {useState, useEffect, useRef} from "react";
import {postComment} from '../services'

const CommentForm = ({slug}) => {
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(null);

    const commentRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const storeDataRef = useRef();



    const formSubmitHandler = async (event) => {
        event.preventDefault();

        const enteredComment = commentRef.current.value;
        const enteredName = nameRef.current.value;
        const enteredEmail = emailRef.current.value;
        const isStore = storeDataRef.current.checked;

        if (!enteredComment || !enteredName || !enteredEmail || !enteredComment.trim().length ||
            !enteredName.trim().length || !enteredEmail.includes('@')) {
            setError(true);
            return;
        }

        const commentObj = {
            name: enteredName,
            email: enteredEmail,
            comment: enteredComment,
            slug,
        }

        if(isStore === true){
            window.localStorage.setItem('CMS_BLOG_DATA', JSON.stringify({name: enteredName, email: enteredEmail}));
        }else{
            window.localStorage.removeItem('CMS_BLOG_DATA');
        }

        postComment(commentObj).then(()=> {
            setShowSuccess(true);

            setTimeout(()=> {
                setShowSuccess(false);
            }, 3000)
        })
    }

    // useEffect(()=>{
    //     const data = window.localStorage.getItem('CMS_BLOG_DATA');
    //     if(data){
    //         const parsedData = JSON.parse(data);
    //         nameRef.current.value = parsedData.name
    //         emailRef.current.value = parsedData.email
    //     }
    //
    // },[]);

    return <div className="rounded-lg shadow-lg mb-8 p-8 pb-12" style={{backgroundColor: 'rgb(208 250 250)'}}>
        <h2 className="font-semibold text-xl mb-3">
            Leave a comment
        </h2>

        <form className="pt-8" onSubmit={formSubmitHandler}>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea ref={commentRef} placeholder="Comment" id="comment" name="comment"
                          className="text-gray-700 text-sm form-control p-4 border border-gray-200 rounded-lg "
                          rows="2"/>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input ref={nameRef} placeholder="Name" id="name" name="name"
                       className="text-gray-700 text-sm form-control px-4 py-1 border border-gray-200 rounded-lg "/>
                <input ref={emailRef} placeholder="Email" id="email" name="email"
                       className="text-gray-700 text-sm form-control px-4 py-1 border border-gray-200 rounded-lg "/>
            </div>

            <div className="flex items-center">
                <input className='inline-block' ref={storeDataRef} id="storeData" name="storeData" type="checkbox" defaultChecked={true} />
                <label htmlFor="storeData" className="text-xs text-gray-700 ml-2 cursor-pointer hover:text-pink-700">Remember me</label>
            </div>
            {error && <p className='text-red-700 text-xs pl-4 mt-2 '>All fields are required !</p>}


            <div className='mt-6 flex items-center justify-between'>
                <button
                    className='bg-pink-700 px-4 py-1 rounded-3xl text-white text-sm cursor-pointer hover:bg-indigo-700 transition duration-500 ease  '>Post
                    Comment
                </button>
                {showSuccess && <p className='text-green-700 text-xs'>Sending your comment to author for review.</p>}
            </div>

        </form>

    </div>;
};

export default CommentForm;
