import Head from "next/head";
import { Categories, PostCard, PostWidget, Header } from "../components";

import { getPosts } from "../services";
import { FeaturedSection }  from "./../section";

export default function Home({ posts }) {

  return (
    <div className="container mx-auto px-5 lg:px-10 mb-16">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FeaturedSection/>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8 ">
          {posts.map((post) => (
            <PostCard key={post.node.slug} post={post.node} />
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
  );
}

export const getStaticProps = async () => {
  const posts = (await getPosts() || []);
  return {
    props: {
      posts,
    },
  };
};
