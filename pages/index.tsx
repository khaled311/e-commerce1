import { FooterBanner, HeroBanner, Product } from "components";
import Head from "next/head";
import { client } from "lib/client";

export default function Home({ products, BannerData }: any) {
  console.log("BannerData", BannerData);
  return (
    <>
      <Head>
        <title>Next.js and Sanity ecommerce app</title>
        <meta name="description" content="Next.js and Sanity ecommerce app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroBanner BannerData={BannerData?.length && BannerData[1]} />

        <div className="products-heading">
          <h2>Best seller products</h2>
          <p>Speaker, there are many variations passages</p>
        </div>

        <div className="products-container">
          {products.map((product: any) => (
            <Product key={product?._id} product={product} />
          ))}
        </div>

        <FooterBanner footerBanner={BannerData && BannerData[0]} />
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);
  const BannerQuery = `*[_type == "banner"]`;
  const BannerData = await client.fetch(BannerQuery);

  return {
    props: {
      products,
      BannerData,
    },
  };
};
