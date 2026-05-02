import axios from "axios";

type AddProductParams = {
  title: string
  image: string
}

async function addProduct({title, image} : AddProductParams){
    try {
        const res = await axios.post('http://localhost:3000/api/products', {
            title,
            image
        })
    return res.data
    } catch (error) {
  if (axios.isAxiosError(error)) {     
    return error.response?.data.message
  } else if (error instanceof Error) { 
    return error.message
  }
}
}

export default addProduct