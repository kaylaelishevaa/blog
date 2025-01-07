import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center h-[400px] md:h-[500px] flex items-center justify-center"
      style={{ backgroundImage: "url('/background-image.jpg')" }}
    >

      <div className="absolute inset-0 bg-black opacity-50"></div>


      <div className="relative text-center text-white px-6 sm:px-8 md:px-12">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Blog
        </h1>
        <p className="text-sm sm:text-lg md:text-xl mb-6">
          Discover articles and stories that inspire and educate.
        </p>
        <Link
          href="/blog"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg transition duration-300"
        >
          Discover More!
        </Link>
      </div>
    </section>
  );
}
