'use client'

import addProduct from "@/services/create-product"
import uploadFile from "@/services/upload-file"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { X } from "lucide-react"
import { toast } from "sonner"



const productSchema = z.object({
    title: z.string().min(1, "Title is required"),
    image: z
    .instanceof(File, { message: "Image is required" })
    .refine(
        (file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Only JPG, PNG, WEBP allowed"
    )
})

type ProductForm = z.infer<typeof productSchema>

const UploadForm = ({onClose}: {onClose: ()=> void}) => {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const {register, handleSubmit, formState:{errors, isSubmitting}, control,  reset} = useForm<ProductForm>({
        resolver: zodResolver(productSchema),
        defaultValues:{
            title: '',
            image: undefined
        }
    })

    async function onSubmit(data:ProductForm){
        try {
        const file = data.image
        const uploadedFile = await uploadFile(file)

        const productResponse = await addProduct(
            {
                title:data.title,
                image: uploadedFile
            }
        )
        reset()
        if(fileInputRef.current){
            fileInputRef.current.value = ''
        }
        router.refresh()
        onClose()
        toast.success('You\'ve added product successfully!', {
            position: 'top-center'
        })

        } catch (error) {
            console.log(error)
        }
    }
return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] z-10">
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>
                    <span className="flex justify-between"> 
                        Add product
                        <Button size='icon' variant='ghost' onClick={onClose}><X/></Button>
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
              <form id="add-product" onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Product title
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="name your product"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                        />

                        <Controller
                        name="image"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Product image
                                </FieldLabel>
                                <Input
                                ref={fileInputRef}
                                    onChange={(e) => {
                                        const currentFile = e.target.files?.[0]
                                        field.onChange(currentFile)
                                    }}
                                    type="file"
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                        />
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter>
                <CardAction className="flex w-full">
                    <Button variant='default' className="w-full" disabled={isSubmitting} type="submit" form="add-product">Submit</Button>
                </CardAction>
            </CardFooter>
        </Card>
    </span>
</div>
    )
}

export default UploadForm
