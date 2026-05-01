'use client'

import { IImage, IProduct } from "@/lib/types"
import Image from "next/image"


const ProductCard = ({title, image} : {title: string, image: IImage}) => {
  return (
    <div className="flex flex-col gap-2">
      <Image alt="product image" src={image.url} width={200} height={200} decoding="async"/>
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  )
}

export default ProductCard
