export function formatWithSpaces(number) {
    return new Intl.NumberFormat('en-ZA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number).replace(/,/g, ' ');
}

export function findItem(item, products)
{
    return products.find(product => item.productId === product.id);
}
