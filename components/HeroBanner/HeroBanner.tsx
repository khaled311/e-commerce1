/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/client";

type Props = {
  BannerData: any;
};

const HeroBanner = ({ BannerData }: Props) => {
  const imageUrl = urlFor(BannerData?.image);

  return (
    <div className="hero-banner-container">
      <div>
        <p>{BannerData?.smallText}</p>
        <h3>{BannerData?.midText}</h3>
        <h1>{BannerData?.largeText1}</h1>
        <img src={imageUrl.url()} alt="" className="hero-banner-image" />

        <div>
          <Link href={`/products/${BannerData?.product}`}>
            <button type="button">{BannerData?.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>{BannerData?.desc}</h5>
            <p>{BannerData?.discount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
