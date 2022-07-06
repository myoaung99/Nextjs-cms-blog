import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components";
import Image from "next/image";

const posts = [
  { title: "Mastering React", excerpt: "Learning the Reactjs" },
  {
    title: "Mastering tailwindcss",
    excerpt: "Learning the Reactjs with tailwindcss",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>GraphQl CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 ">
        <div className="col-span-1 lg:col-span-8 ">
          {posts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
