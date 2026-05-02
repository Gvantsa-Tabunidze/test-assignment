'use client'


import { Item, ItemMedia, ItemTitle } from "@/components/ui/item"
import { IProduct } from "@/lib/types"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"



const ProductCard:React.FC<IProduct> = ({image,title, id}) => {
const searchParams = useSearchParams()
const router = useRouter()

function handleClick(){
  const params= new URLSearchParams(searchParams.toString())
  params.set('product_id', id)
  params.set('product', title)
  router.push(`?${params.toString()}`)
}


  return(
    <div onClick={handleClick} className="cursor-pointer">
      <Item className="flex flex-col">
        <ItemMedia className="w-full aspect-square overflow-hidden relative">
          <Image alt="product image" src={image.url} fill decoding="async" className="object-cover rounded-4xl"/>
        </ItemMedia>
      <ItemTitle>{title}</ItemTitle>
      </Item>
    </div>
      
  )
  
}

export default ProductCard
