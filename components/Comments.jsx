import React, {useEffect, useState} from "react";
import {getComments} from "../services";
import {} from "html-react-parser"
import moment from "moment";


const Comments = ({slug}) => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(slug).then((response) => setComments(response))
    }, [slug]);

    return <div className="rounded-lg shadow-lg mb-10 p-8 pb-12" style={{backgroundColor: 'rgb(208 250 250)'}}>

        <h2 className="font-semibold text-xl mb-8">
            {comments.length} Comments
        </h2>

        <div>
            {comments.map(comment => {
                    return (<div className='mb-2 pb-3 border-b border-b-white' key={comment.createdAt}>
                        <div className="flex items-center">
                            <h2 className="font-semibold text-lg">{comment.name}</h2>
                            <span className="ml-2 text-sm">on {moment(comment.createdAt).format('MMM DD, YY')}</span>
                        </div>

                        <p className="whitespace-pre-line text-gray-600">{comment.comment}</p>

                    </div>)

            })
            }
        </div>
    </div>;
}
export default Comments;
