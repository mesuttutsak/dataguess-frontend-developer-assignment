export default function filterData(data: [], value: string, group?: any) {    
    const groupParam = group.toLocaleLowerCase();
    const inputValue = value.toLocaleLowerCase();
    
    const filtered = data.filter((item: any, index: number) => {
        if (groupParam !== "all") {
            return flattenJSON(item[groupParam], groupParam).includes(inputValue);
        } else {
            const allValues = flattenJSON(item);
            return allValues.includes(inputValue);
        }
    });

    return value ? filtered : data;
}

function flattenJSON(obj: Record<string, any>, targetKey?: string): string {
    let result = '';
    
    for (const key in obj) {
        
        if (key === '__typename') {
            continue;
        }
        
        if (key === targetKey) {
            result += `${obj[key]}`;
        } else if (typeof obj[key] === 'object') {
            result += flattenJSON(obj[key]);
        } else if (typeof obj[key] !== 'function') {
            result += `${obj[key]}`;
        }
    }

    return result.toLowerCase().trim();
}