'use server'

import getProducts from "@/services/get-products"
import UploadForm from "./components/UploadForm"
import ProductCard from "./components/ProductCard"
import SearchInput from "./components/SearchInput"
import Pagination from "./components/Pagination"

type QueryProps = {
   searchParams: Promise<{ page?: string; per_page?: string; search?: string }>
}

export default async function Home({ searchParams }: QueryProps) {
  const params = await searchParams
  
  const data = await getProducts({
    page: params.page,
    per_page: params.per_page,
    search: params.search
  })

  if(!data) return <p>Loading . . . </p>

  return (
    <>
      <div className="flex flex-col flex-1 items-center justify-center font-sans">
        <UploadForm />
      </div>
      <div className="flex flex-col gap-4 w-full px-60 py-16">
        <SearchInput />
        <div>
          <div className="grid grid-cols-4 gap-4">
        {data.data?.map((item) => (
          <ProductCard title={item.title} key={item.title} image={item.image} />
        ))}
      </div>
          <Pagination
            currentPage={data.metadata.page}
            totalPages={data.metadata.totalPages}
            totalItems={data.metadata.totalItems}
          />
        </div>
      </div>
    </>
  )
}