
import axios from "axios";

type Params = {
  page?: string
  per_page?: string
  search?: string
}

export default async function getProducts(params: Params = {}){
   try {
    const query = new URLSearchParams()
    if (params.page) query.set('page', params.page)
    if (params.per_page) query.set('per_page', params.per_page)
    if (params.search) query.set('search', params.search)

    const res = await axios.get(`http://localhost:3000/api/products?${query.toString()}`, )
     return res.data
   } catch (error) {
    console.log(error)
    return []
   }
}