import { Document } from "@contentful/rich-text-types";

export interface Category {
  fields: {
    name: string;
    description: string;
  };
}

export interface Post {
  fields: {
    title: string;
    name: string;
    author: { fields: { name: string } };
    category: { fields: { name: string } };
    content: Document;
    image: {fields: {file: {url: string}}};
    excerpt: string;
    slug: string; 
  };
}
