export const extractFields = (data: any[]): { requiredFields: string[]; optionalFields: string[] } => {
    if (data.length === 0) return { requiredFields: [], optionalFields: [] };

    const allKeys = data.flatMap((record) => Object.keys(record).filter((key) => key !== "id"));
    const uniqueKeys = Array.from(new Set(allKeys));

    const requiredFields = uniqueKeys.filter((key) =>
        data.every((record) => key in record)
    );
    const optionalFields = uniqueKeys.filter((key) => !requiredFields.includes(key));

    return { requiredFields, optionalFields };
};
