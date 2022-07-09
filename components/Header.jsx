import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

  return (
    <header className="container mx-auto px-10 mb-8">
      <div className="w-full inline-block py-8 border-b border-b-emerald-500">
        <div className="md:float-left block">
          <Link href="/">
            <span className="text-gray-200 text-4xl font-black cursor-pointer ">
              CMS Blog
            </span>
          </Link>
        </div>

        <div className="hidden md:contents md:float-left">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="text-gray-200 cursor-pointer px-2 mt-2 ml-2 md:float-right align-middle ">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
