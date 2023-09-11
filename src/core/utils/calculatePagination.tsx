export default function calculatePagination(totalItems: number, itemsPerPage: number): number {
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    return pageCount;
}