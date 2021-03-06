import React, { useState, useEffect } from "react";
import { getCategories } from "../services";
import Link from "next/link";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((response) => {

      setCategories(response)
    });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 lg:ml-4 mt-5" style={{backgroundColor: 'rgb(208 250 250)'}}>
      <h2 className="font-semibold text-xl mb-5">Categories</h2>
      {categories.map((category) => {
        return (
          <div key={category.slug} className="mb-3">
            <Link className="" href={`/category/${category.slug}`}>
              <span
                className="hover:cursor-pointer hover:text-rose-700 text-sm transition duration-500 "
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
