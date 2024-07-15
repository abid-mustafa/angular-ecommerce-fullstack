import { product } from '../product';
import axios from "axios";

// GET REQUEST
export async function getProducts() {
  let items: product[] = [];
        try {
          const response =  await axios.get(
            'http://localhost:3000/api/products/'
          );
          const data = response.data;

          for (let i=0 ; i<data.length; i++) {
                items[i] = new product(
                    data[i].product_id,
                    data[i].product_name,
                    data[i].product_description,
                    data[i].product_price,
                    data[i].category_name
                  )
          }
        }
        catch (err){
          console.log(err)
        }
        return items
}

// GET REQUEST
export async function getLatestProductId() {
        try {
          const response =  await axios.get(
            'http://localhost:3000/api/products/last'
          )
          const data = response.data;

          const lastProductId = data[0].id
            return lastProductId
        }
        catch (err){
          console.log(err)
          return -1
        }
}

// DELETE REQUEST
export async function deleteProduct(id: number) {
        try {
          const response =  await axios.delete(
            'http://localhost:3000/api/products/' + id
          )
        }
        catch (err){
          console.log(err)
        }
}

// PUT REQUEST
export async function updateProduct(updatedProduct: product) {
  console.log('in put request', updatedProduct)
        try {
          const response =  await axios.put(
            'http://localhost:3000/api/products/' + updatedProduct.id, {
              name: updatedProduct.name,
              description: updatedProduct.description,
              price: updatedProduct.price,
              categoryName: updatedProduct.categoryName
            }
          )
        }
        catch (err){
          console.log(err)
        }
}

// POST REQUEST
export async function insertProduct(name: string, description: string, price: number, categoryName: string) {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/products/', {
        name: name,
        description: description,
        price: price,
        categoryName: categoryName
      }
      )
    return true
    }
    catch (err){
      console.log(err)
      return false
  }
}