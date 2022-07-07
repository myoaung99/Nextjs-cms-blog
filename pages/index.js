import Head from "next/head";
import { Categories, PostCard, PostWidget, Header } from "../components";

import { getPosts } from "../services";

const posts = [
  { title: "Mastering React", excerpt: "Learning the Reactjs" },
  {
    title: "Mastering tailwindcss",
    excerpt: "Learning the Reactjs with tailwindcss",
  },
];

export default function Home({ posts }) {

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8 ">
          {posts.map((post) => (
            <PostCard key={post.node.slug} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky  top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = (await getPosts() || []);
  console.log(posts)
  return {
    props: {
      posts,
    },
  };
};
