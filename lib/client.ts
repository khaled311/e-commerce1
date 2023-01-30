import createClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = new createClient({
  projectId: "2mtx349g",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-13",
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};
