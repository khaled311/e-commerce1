/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { client, urlFor } from "lib/client";
import { Product } from "components";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useStateContext } from "context/stateContext";

type Props = {
  product: any;
  products: any;
};

const ProductDetails = ({ product, products }: Props) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { addToCart, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    addToCart(product, productQuantity);

    setShowCart(true);
  };

  useEffect(() => {
    return () => {
      setProductQuantity(1);
    };
  }, [product?._id]);

  const incQty = () => {
    setProductQuantity((prev) => prev + 1);
  };

  const decQty = () => {
    setProductQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              alt=""
              src={urlFor(image && image[index]) as unknown as string}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item: any, i: number) => (
              <img
                alt=""
                key={i as number}
                src={urlFor(item) as unknown as string}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{productQuantity}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => addToCart(product, productQuantity)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container">
            {products?.map((item: { _id: React.Key | null | undefined }) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {slug {current}}`;

  const products = await client.fetch<any>(query);
  const paths = products.map((product: any) => ({
    params: { slug: product?.slug?.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }: any) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productsQuery = `*[_type == "product"]`;

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: {
      product,
      products,
    },
  };
};
