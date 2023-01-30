/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { urlFor } from "lib/client";

type Props = {
  product: any;
};

const Product = ({ product: { name, image, slug, price } }: Props) => {
  return (
    <div>
      <Link href={`/product/${slug?.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0]) as unknown as string}
            width={250}
            height={250}
            alt={`product ${name} image`}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">{price}$</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
