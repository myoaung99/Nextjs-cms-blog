import React, { useEffect, useState } from "react";
import { getSimilarPosts, getRecentPosts } from "../services";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const PostWidget = ({ currentPostSlug, currentPostCategories }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  // home page မှာလား post detail ထဲကို ရောက်နေတာလားဆိုတာ slug နဲ့ ဆုံးဖြတ်ပြီး
  // suggestion ပေးမဲ့ post တွေကို ဆုံးဖြတ်တာပါ

  useEffect(() => {
    if (currentPostSlug) {
      getSimilarPosts(currentPostSlug, currentPostCategories).then((response) =>
        setRelatedPosts(response)
      );
    } else {
      getRecentPosts().then((response) => setRelatedPosts(response));
    }
  }, [currentPostSlug, currentPostCategories]);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-5 lg:ml-4">
        <h2 className="font-semibold text-xl mb-3">
          {currentPostSlug ? "Related Posts" : "Recent Posts"}
        </h2>
        {relatedPosts.map((relatedPost) => {
          return (
            <div key={relatedPost.slug}>
              <div className="flex items-end mb-3">
                <Image
                  src={relatedPost.featurePhoto.url}
                  className="rounded-full"
                  width={40}
                  height={40}
                  alt={relatedPost.title}
                />
                <div className="ml-4">
                  <span className="text-gray-500 text-xs">
                    {moment(relatedPost.createdAt).format("MMMM DD, YYYY")}
                  </span>
                  <Link href={`post/${relatedPost.slug}`}>
                    <p
                      className="text-gray-700 text-xs cursor-pointer hover:text-pink-500
                                        transition duration-500"
                    >
                      {relatedPost.title}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostWidget;
