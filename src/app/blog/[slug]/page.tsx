import { getContentfulData } from "@/app/utils/get-contentful-data";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/contentful";

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const posts = (await getContentfulData({
    contentType: "post",
    fieldSlug: slug,
  })) as unknown as Post[];

  console.log(posts);
  const post = posts[0];
  return (
    <article className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <div className="relative h-80 md:h-[450px]">
        <Image
          src={`https:${post?.fields?.image.fields.file.url}`}
          alt={post?.fields?.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          {post?.fields?.title}
        </h1>
        <p className="text-lg text-gray-600 mb-4">{post.fields?.excerpt}</p>
        <div className="flex justify-between text-sm text-gray-500 mb-6">
          <span>
            By{" "}
            <Link href="/about" className="text-blue-500 hover:underline">
              {post.fields?.author.fields.name}
            </Link>
          </span>
          <span>
            Category:{" "}
            <Link
              href={`/categories/${post.fields?.category.fields?.name}`}
              className="text-blue-500 hover:underline"
            >
              {post.fields?.category.fields?.name}
            </Link>
          </span>
        </div>
        <div className="prose max-w-none leading-relaxed text-gray-700">
          {documentToReactComponents(post.fields?.content)}
        </div>
      </div>
    </article>
  );
}
