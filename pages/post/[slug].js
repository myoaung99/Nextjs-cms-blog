import React from "react";
import {
  PostDetail,
  Author,
  CommentForm,
  Comments,
  PostWidget,
  Categories,
} from "./../../components";

import { getPostDetail } from "../../services";

const PostDetailScreen = ({ post }) => {
  console.log(post);
  return (
    <div className="container mx-auto px-5 lg:px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              currentPostSlug={post.slug}
              currentPostCategories={post.categories.map(
                (category) => category.slug
              )}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailScreen;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const post = await getPostDetail(slug);
  return {
    props: {
      post,
    },
  };
};
