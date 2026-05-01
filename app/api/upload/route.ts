import { productCache } from "@/helpers/cashing-data";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function POST(req:NextRequest){
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    //generate filename
    const uniqueName = `${randomUUID()}.webp`
    const uploadDirPath = path.join(process.cwd(), 'public', 'uploads')

    await mkdir(uploadDirPath, {recursive: true})
    
    //save files locally
    const rawBytes = await file.arrayBuffer()
    const bufferData = Buffer.from(rawBytes)
    const processedImage = await sharp(bufferData).resize({ width: 800 }).webp({ quality: 80 }).toBuffer()
    await writeFile(path.join(uploadDirPath, uniqueName), processedImage)


    const newImage = {
    id: randomUUID(),
    name: file.name,
    url: `/uploads/${uniqueName}`,
    type: file.type,
    size: file.size,
    createdAt: new Date().toISOString()
    }

     productCache.invalidate()

  return NextResponse.json(newImage, { status: 201 })
}

