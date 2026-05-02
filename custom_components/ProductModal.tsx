'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IProduct } from "@/lib/types"
import { X } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

const ProductModal = ({data} :{data:IProduct}) => {
    const router = useRouter()
  const searchParams = useSearchParams()

  function handleClose(){
    const params = new URLSearchParams(searchParams.toString())
    params.delete('product_id')
    params.delete('product')
    const query = params.toString()
    router.push(query ? `?${query}` : '/')
  }


  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <Card className="w-[90%] max-w-lg">
            <CardHeader className="flex justify-between">
            <CardTitle>{data.title}</CardTitle>
            <Button size='icon' variant='ghost' onClick={handleClose}><X/></Button>
            </CardHeader>
            <CardContent>
            <Image
                src={data.image.url}
                alt={`${data.title} image`}
                width={400}
                height={400}
                className="w-full h-auto object-cover"
            />
            </CardContent>
        </Card>
   </div>
  )
}

export default ProductModal
