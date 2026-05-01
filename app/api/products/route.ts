
import { QueryStrongParser } from "@/helpers/url-query-parser";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from 'crypto'
import { productCache } from "@/helpers/cashing-data";



export async function GET(req:NextRequest){
 try {
    const { searchParams } = new URL(req.url);
    const currentPage = QueryStrongParser(searchParams.get('page'), 1);
    const itemsPerPage =  QueryStrongParser(searchParams.get('per_page'), 10);
    const search = searchParams.get('search')?.toLowerCase().trim() || '';
    const cacheKey = `products_${currentPage}_${itemsPerPage}_${search}`;
    const cachedData = productCache.get(cacheKey)
    if(cachedData){
        return NextResponse.json(cachedData)
    }

    await db.read()
    let products = db.data?.products ?? []
    if(search){
        products = products.filter(p => p.title.toLowerCase().includes(search))
    }
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    const paginatedItems = products.slice(start, end)
 
 const response =   {
        data: paginatedItems,
        metadata:{
            page: currentPage,
            per_page: itemsPerPage,
            totalItems: products.length,
            totalPages: Math.ceil(products.length / itemsPerPage)
        }
    }

    productCache.set(cacheKey, response)

    return NextResponse.json(response)
 
 } catch (error) {
    return NextResponse.json({error: 'Failed to fetch products'}, {status: 500})
 }
}


export async function POST(req:NextRequest){
    try {
    const requestBody =  await req.json()
    await db.read()
    const newProduct = {
        id: randomUUID(),
        title: requestBody.title,
        image: requestBody.image,
        createdAt: new Date().toISOString()
    }
    db.data.products.push(newProduct)

    await db.write()
    productCache.invalidate()

    return NextResponse.json(newProduct, { status: 201 })

    } catch (error) {
        return NextResponse.json({error: 'Failed to add product'}, {status: 500})
    }
}