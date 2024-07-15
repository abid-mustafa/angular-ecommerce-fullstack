import { category } from '../category';
import axios from "axios";

// GET REQUEST
export async function getCategories() {
  let items: category[] = [];
        try {
          const response =  await axios.get(
            'http://localhost:3000/api/categories/'
          );
          const data = response.data;

          for (let i=0 ; i<data.length; i++) {
                items[i] = new category(
                    data[i].id,
                    data[i].name,
                    data[i].description
                  )
          }
        }
        catch (err){
          console.log(err)
        }
        return items
}

// GET REQUEST
export async function getLatestCategoryId() {
        try {
          const response =  await axios.get(
            'http://localhost:3000/api/categories/last'
          )
          const data = response.data;

          const lastCategoryId = data[0].id
            return lastCategoryId
        }
        catch (err){
          console.log(err)
          return -1
        }
}

// DELETE REQUEST
export async function deleteCategory(id: number) {
        try {
          const response =  await axios.delete(
            'http://localhost:3000/api/categories/' + id
          )
        }
        catch (err){
          console.log(err)
        }
}

// PUT REQUEST
export async function updateCategory(updatedcategory: category) {
  console.log('in put request', updatedcategory)
        try {
          const response =  await axios.put(
            'http://localhost:3000/api/categories/' + updatedcategory.id, {
              name: updatedcategory.name,
              description: updatedcategory.description,
            }
          )
        }
        catch (err){
          console.log(err)
        }
}

// POST REQUEST
export async function insertCategory(name: string, description: string) {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/categories/', {
        name: name,
        description: description
      }
      )
    return true
    }
    catch (err){
      console.log(err)
      return false
  }
}