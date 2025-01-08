"use client";

import { useState, useEffect } from "react";
import { getContentfulData } from "../utils/get-contentful-data";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/contentful";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = (await getContentfulData({
          contentType: "post",
        })) as unknown as Post[];
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Filtered posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.fields.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        Blog Posts
      </h1>

      {/* Search Input */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base"
        />
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts?.map((post, index) => (
          <article
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
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
                <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 hover:underline">
                  {post.fields.title}
                </h2>
              </Link>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                {post.fields.excerpt}
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm sm:text-base text-gray-500">
                <Link href="/about" className="text-blue-500 hover:underline">
                  By {post.fields.author.fields.name}
                </Link>
                <Link
                  href="/categories"
                  className="text-blue-500 hover:underline mt-2 sm:mt-0"
                >
                  {post.fields.category.fields.name}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
