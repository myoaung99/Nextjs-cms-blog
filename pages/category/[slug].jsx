import React from "react";
import {Categories, PostCard, PostWidget} from "../../components";
import {getCategoryPosts, getPosts} from "../../services";

const Category = ({posts})=>{
    return <div className="container mx-auto px-5 lg:px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12">
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
        </div>
    </div>
}

export default Category;

export const getStaticPaths = () =>{

    return {
        paths: [],
        fallback: 'blocking',
    }
}

export const getStaticProps = async (context) => {
    const {slug} = context.params;
    console.log(slug);
    const posts = (await getCategoryPosts(slug) || []);
    console.log(posts)
    return {
        props: {
            posts,
        },
    };
};
