import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'categoryFilter' })
export class CategoryPipe implements PipeTransform {
    /**
     * Pipe filters the list of elements based on the search text provided
     *
     * @param items list of elements to search in
     * @param searchText search string
     * @returns list of elements filtered by search text or []
     */
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }

        const result = items.reduce((acc, product) => {
            const cat = product.categoryName.toLocaleLowerCase();
            if (cat.startsWith(searchText.toLocaleLowerCase())) {
                acc.push(product);
            }
            return acc;
        }, []);

        return result;
    }
}