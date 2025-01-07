"use client";

import { useState, useEffect, useCallback } from "react";
import { getContentfulData } from "../utils/get-contentful-data";
import { Category, Post } from "@/types/contentful";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const categories = (await getContentfulData({
        contentType: "category",
      })) as unknown as Category[];
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const posts = (await getContentfulData({
        contentType: "post",
      })) as unknown as Post[];
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, [fetchCategories, fetchPosts]);

  const filteredPosts = selectedCategory
    ? posts.filter(
        (post) => post.fields.category.fields.name === selectedCategory
      )
    : posts;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center md:text-left">
        Categories
      </h1>

      {/* Daftar Kategori */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`shadow p-3 sm:p-4 rounded-lg w-full sm:w-auto text-center ${
            !selectedCategory ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          All Categories
        </button>
        {categories.map((category: Category, index: number) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category.fields.name)}
            className={`shadow p-3 sm:p-4 rounded-lg w-full sm:w-auto text-center ${
              selectedCategory === category.fields.name
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            <h2 className="text-base sm:text-lg font-semibold">
              {category.fields.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              {category.fields.description}
            </p>
          </button>
        ))}
      </div>

      {/* Daftar Blog */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center md:text-left">
        {selectedCategory ? `Posts in "${selectedCategory}"` : "All Posts"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post: Post, index: number) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="relative h-52 sm:h-64">
              <Image
                src={`https:${post?.fields?.image?.fields?.file.url}`}
                alt={post.fields.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <Link href={`/blog/${post.fields.slug}`}>
                <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">
                  {post.fields.title}
                </h2>
              </Link>
              <p className="text-sm sm:text-base text-gray-700 mb-2">
                {post.fields.excerpt}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Category: {post.fields.category.fields.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
