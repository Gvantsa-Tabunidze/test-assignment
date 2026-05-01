'use client'

import addProduct from "@/services/create-product"
import uploadFile from "@/services/upload-file"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import z from "zod"

const productSchema = z.object({
    title: z.string().min(1, "Title is required"),
    image: z.any()
    .refine((file)=> file?.length === 1, 'Image is required')
    .refine((file)=>{
       if (!file?.[0]) return false
       return ["image/jpeg", "image/png", "image/webp"].includes(file[0].type)
    },
    "Only JPG, PNG, WEBP allowed" )
})

type ProductForm = z.infer<typeof productSchema>

const UploadForm = () => {
    const router = useRouter()
    const {register, handleSubmit, formState:{errors, isSubmitting}, reset} = useForm<ProductForm>({
        resolver: zodResolver(productSchema)
    })

    async function onSubmit(data:ProductForm){
        try {
        const file = data.image[0]
        const uploadedFile = await uploadFile(file)

        const productResponse = await addProduct(
            {
                title:data.title,
                image: uploadedFile
            }
        )
        reset()
        router.refresh()

        if (!productResponse.ok) throw new Error("Failed to add product")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="space-y-4">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)} method="post">

        <div>
            <input
            {...register("title")}
            placeholder="Product title"
            className="border p-2 w-full"
            />
            {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
            )}
        </div>

        
        <div>
            <input
            type="file"
            className="border p-2 w-full"
            accept="image/*"
            {...register("image")}
            
            />
            {errors.image && (
            <p className="text-red-500">{errors.image.message as string}</p>
            )}
        </div>

        <button disabled={isSubmitting} className="bg-indigo-600 text-white px-4 py-2">Submit</button>
        </form>
    </div>
    
  )
}

export default UploadForm
