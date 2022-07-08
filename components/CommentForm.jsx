import React, {useState, useEfffect, useRef} from "react";

const CommentForm = ({slug}) => {
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(null);

    const commentRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const storeRef = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const enteredComment = commentRef.current.value;
        const enteredName = nameRef.current.value;
        const enteredEmail = emailRef.current.value;

        console.log(enteredComment, enteredName, enteredEmail);
    }
    return <div className="bg-white rounded-lg shadow-lg mb-8 p-8 pb-12">
        <h2 className="font-semibold text-xl mb-3">
            Comment
        </h2>

        <form className="pt-2" onSubmit={formSubmitHandler}>
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
            {error && <p className='text-red-700 text-xs pl-4 mt-2 '>All fields are required !</p>}


            <div className='mt-8 flex items-center justify-between'>
                <button
                    className='bg-pink-700 px-4 py-1 rounded-3xl text-white text-sm cursor-pointer hover:bg-indigo-700 transition duration-500 ease  '>Post
                    Comment
                </button>
                {showSuccess && <p className='text-green-700 text-xs'>Success</p>}
            </div>

        </form>

    </div>;
};

export default CommentForm;
