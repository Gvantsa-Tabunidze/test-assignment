import { CashData } from "@/lib/types";

const cache = new Map<string, CashData>()

export const productCache = {
    get: (key:string)=>{
        const entry = cache.get(key)
        if(!entry) return null
        return entry.data
    },
    set(key: string, data: unknown) {
        cache.set(key, {data})
  },
   invalidate() {
    cache.clear()
  }
}