// "use client";

// import { useState } from "react";

// export default function Footer() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [status, setStatus] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setStatus("Message sent successfully!");
//         setFormData({ name: "", email: "", message: "" });
//       } else {
//         setStatus("Failed to send message.");
//       }
//     } catch (error) {
//       setStatus("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <footer className="bg-gray-800 text-white py-8">
//       <div className="container mx-auto text-center">
//         <h3 className="text-xl font-bold mb-4">Contact Us</h3>
//         <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 rounded border border-gray-300"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 rounded border border-gray-300"
//             required
//           />
//           <textarea
//             name="message"
//             placeholder="Your Message"
//             value={formData.message}
//             onChange={handleChange}
//             className="w-full p-2 rounded border border-gray-300"
//             rows={4}
//             required
//           ></textarea>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           >
//             Send
//           </button>
//         </form>
//         {status && <p className="mt-4">{status}</p>}
//       </div>
//     </footer>
//   );
// }

"use client";

import { useState } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Reset form setelah submit
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <footer className="mt-32 bg-[#232536] pb-10">
      <div className="container mx-auto px-6 py-8 text-white md:px-12">
        <h3 className="text-2xl font-bold mb-6 text-center">Contact Us</h3>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-32 px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="w-full h-12 bg-[#FF5959] text-white font-bold rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </footer>
  );
}
