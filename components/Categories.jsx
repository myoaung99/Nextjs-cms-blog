import React, { useState, useEffect } from "react";
import { getCategories } from "../services";
import Link from "next/link";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 ml-4 mt-5">
      <h2 className="font-semibold text-xl mb-5">Categories</h2>
      {categories.map((category) => {
        return (
          <div key={category.slug} className="mb-3">
            <Link className="" href={`category/${category.slug}`}>
              <span
                className="hover:cursor-pointer hover:text-pink-500 transition duration-500 "
                key={category.slug}
              >
                {category.name}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
