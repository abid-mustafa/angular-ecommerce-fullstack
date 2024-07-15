export class product {
    id: number
    name: string
    description: string
    price: number
    categoryName: string

    constructor(id: number, name: string, description: string, price: number, categoryName: string) {
        this.id = id
        this.name = name
        this.description = description
        this.price = price
        this.categoryName = categoryName
    }

}