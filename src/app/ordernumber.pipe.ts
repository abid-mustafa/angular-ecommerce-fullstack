import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'orderNumberFilter' })
export class OrderNumberPipe implements PipeTransform {
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

        const result = items.reduce((acc, order) => {
            if (order.orderNumber.startsWith(searchText)) {
                acc.push(order);
            }
            return acc;
        }, []);

        return result;
    }
}