'use server'

import getProducts from "@/services/get-products"
import UploadForm from "../custom_components/UploadForm"
import ProductCard from "../custom_components/ProductCard"
import SearchInput from "../custom_components/SearchInput"
import Pagination from "../custom_components/Pagination"
import AppHeader from "../custom_components/AppHeader"
import { IProduct, Product } from "@/lib/types"
import ProductModal from "../custom_components/ProductModal"
import AppPagination from "../custom_components/Pagination"

type QueryProps = {
   searchParams: Promise<{ page?: string; per_page?: string; search?: string, product_id?:string, product?: string}>
}

export default async function Home({ searchParams }: QueryProps) {
  const params = await searchParams
  
  const data = await getProducts({
    page: params.page,
    per_page: params.per_page,
    search: params.search
  })

  const selectedProduct = params.product_id ? data.data.find((product:IProduct)=> product.id === params.product_id) : null


  return (
    <>
    <AppHeader />
      {selectedProduct && <ProductModal data={selectedProduct}/>}
      <div className="flex flex-col w-full p-20">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {data.data?.map((item:IProduct) => (
          <ProductCard title={item.title} key={item.id} image={item.image} id={item.id} />
        ))}
      </div>
          <AppPagination
            currentPage={data.metadata.page}
            totalPages={data.metadata.totalPages}
            totalItems={data.metadata.totalItems}
          />
      </div>
      
    </>
  )
}