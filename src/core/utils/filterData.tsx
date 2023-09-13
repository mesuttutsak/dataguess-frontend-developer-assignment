export default function filterData(data: [], value: string) {
    const inputValue = value.toLowerCase();
    const filtered = data.filter((item: any, index: number) => {
        const allValues = flattenJSON(item);
        return allValues.includes(inputValue);
    });

    return value ? filtered : data;
}

function flattenJSON(obj: Record<string, any>): string {
    let result = '';

    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            result += flattenJSON(obj[key]);
        } else if (typeof obj[key] !== 'function') {
            result += `${obj[key]} `;
        }
    }

    return result.toLocaleLowerCase().trim();
}