import { extractFields } from "./extractFields";

test("correctly extracts required and optional fields", () => {
    const data = [
        { name: "John", age: 25, email: "john@example.com" },
        { name: "Jane", age: 30 },
        { name: "Alice", city: "New York" }
    ];

    const { requiredFields, optionalFields } = extractFields(data);

    expect(requiredFields).toEqual(["name"]);
    expect(optionalFields).toEqual(["age", "email", "city"]);
});

test("handles empty data array", () => {
    let dataEmpty: any[];
    dataEmpty = [];

    const { requiredFields, optionalFields } = extractFields(dataEmpty);

    expect(requiredFields).toEqual([]);
    expect(optionalFields).toEqual([]);
});

test("handles data where all records have the same fields", () => {
    const data = [
        { name: "John", age: 25 },
        { name: "Jane", age: 30 }
    ];

    const { requiredFields, optionalFields } = extractFields(data);

    expect(requiredFields).toEqual(["name", "age"]);
    expect(optionalFields).toEqual([]);
});

test("handles different data types in fields", () => {
    const data = [
        { name: "John", age: 25, isStudent: true },
        { name: "Jane", age: 30, isStudent: false },
        { name: "Alice", city: "New York" }
    ];

    const { requiredFields, optionalFields } = extractFields(data);

    expect(requiredFields).toEqual(["name"]);
    expect(optionalFields).toEqual(["age", "isStudent", "city"]);
});

test("handles duplicate keys in data", () => {
    const data = [
        { name: "John", age: 25 },
        { name: "Jane", age: 30 },
        { name: "Alice", age: 30 }
    ];

    const { requiredFields, optionalFields } = extractFields(data);

    expect(requiredFields).toEqual(["name", "age"]);
    expect(optionalFields).toEqual([]);
});

test("handles null or undefined values in fields", () => {
    const data = [
        { name: "John", age: 25, email: null },
        { name: "Jane", age: 30, email: undefined },
        { name: "Alice", city: "New York" }
    ];

    const { requiredFields, optionalFields } = extractFields(data);

    expect(requiredFields).toEqual(["name"]);
    expect(optionalFields).toEqual(["age", "email", "city"]);
});

test("handles large dataset", () => {
    const data = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `User${i}`,
        ...(i % 2 === 0 ? { age: i } : {}),
        ...(i % 3 === 0 ? { email: `user${i}@example.com` } : {})
    }));

    const { requiredFields, optionalFields } = extractFields(data);

    expect(requiredFields).toContain("name");
    expect(optionalFields).toContain("age");
    expect(optionalFields).toContain("email");
});

