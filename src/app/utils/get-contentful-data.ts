import * as contentful from "contentful";

const client = contentful.createClient({
  space: "4c91kgny6urb",
  environment: "master",
  accessToken: "rb_GS3pVEu2rLl1PBypYrbMHEHGVT0_K0KdkQkcOtUo",
});

export async function getContentfulData({
  contentType,
  fieldSlug,
}: {
  contentType: string;
  fieldSlug?: string;
}) {
  try {
    const data = await client.getEntries({
      content_type: contentType,
      "fields.slug": fieldSlug,
    });
    return data.items;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// export async function searchPostByTitle(keyword: string) {
//   try {
//     const res = await client.getEntries({
//       content_type: "post",
//       "fields.title[match]": keyword,
//     });
//     return res.items;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }
