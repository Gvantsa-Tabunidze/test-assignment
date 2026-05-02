
//Backend types
export type Database = {
  products: Product[]
}

export type Product = {
    id: string
    title: string
    image : MediaFile
    createdAt: string
}

export type MediaFile = {
    id: string
    name: string
    url: string
    type: string // 'image' | 'video' | 'audio' etc
    size: number
    createdAt: string
}


//FrontEnd interfaces

export interface IProduct {
    id:string
    title: string
    image: IImage
}

export interface IImage{
    url: string
    id: string
    name: string
    type?: string
    size?: number
    createdAt?: string
}

//Cash data type
export type CashData = {
  data: unknown
}


