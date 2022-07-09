import React from "react";
import {Categories, PostCard, PostWidget} from "../../components";
import {getCategories, getCategoryPosts, getFeaturedPosts, getPosts} from "../../services";
import Overlay from "../../components/Modal";

const Category = ({posts})=>{
    return (
        <>
            {!posts && <Overlay/>}
            {posts && (<div className="container mx-auto px-5 lg:px-10 mb-8"><div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-8 ">
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky  top-8">
                        <PostWidget currentPostSlug={null} currentPostCategories={null} />
                        <Categories />
                    </div>
                </div>
            </div>  </div>)}
        </>
    )
}

export default Category;

export const getStaticPaths = async () =>{
    return {
        paths: [],
        fallback: true,
    };
}

export const getStaticProps = async (context) => {
    const {slug} = context.params;
    const posts = (await getCategoryPosts(slug));
    return {
        props: {
            posts,
        },
        revalidate: 30000
    };
};
