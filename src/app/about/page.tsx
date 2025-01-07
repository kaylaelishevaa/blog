import Image from "next/image";
import { getContentfulData } from "../utils/get-contentful-data";

interface Author {
  fields: {
    name: string;
    bio: string;
    photo: { fields: { file: { url: string } } };
  };
}

export default async function AboutPage() {
  const authors = (await getContentfulData({
    contentType: "author",
  })) as unknown as Author[];

  return (
    <section className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">
        About Our Authors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors?.map((author, index: number) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden p-6 text-center"
          >
            <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden mb-4">
              <Image
                src={`https:${author.fields.photo.fields.file.url}`}
                alt={author.fields.name}
                layout="fill"
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {author.fields.name}
            </h2>
            <p className="text-gray-600 mb-4">{author.fields.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
