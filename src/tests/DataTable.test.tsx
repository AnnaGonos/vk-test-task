import React from "react";
import { render, screen, waitFor, fireEvent  } from "@testing-library/react";
import DataTable from "../components/DataTable/DataTable";
import axios from "axios";

jest.mock("axios");

test("проверяет отображение данных после загрузки первой порции", async () => {
    const mockData = [
        { id: 1, name: "Смартфон ProMax 15", price: 999.99 },
        { id: 2, name: "Ноутбук UltraBook X2", price: 1499.99 },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<DataTable />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith("http://localhost:4000/records?_start=0&_limit=20"));

    expect(screen.getByText("Смартфон ProMax 15")).toBeInTheDocument();
    expect(screen.getByText("999.99")).toBeInTheDocument();
});

// test("проверяет обработку пустых данных", async () => {
//     (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });
//
//     render(<DataTable />);
//
//     await waitFor(() => expect(axios.get).toHaveBeenCalledWith("http://localhost:4000/records?_start=0&_limit=20"));
//
//     expect(screen.queryByText("Смартфон ProMax 15")).not.toBeInTheDocument();
//     expect(screen.getByText("Все данные загружены")).toBeInTheDocument();
// });
//
//
// test("проверяет отображение индикатора загрузки", async () => {
//     const mockAxios = axios as jest.Mocked<typeof axios>;
//     mockAxios.get.mockResolvedValueOnce({ data: [] });
//
//     render(<DataTable />);
//
//     expect(screen.getByText("Загружаю больше данных...")).toBeInTheDocument();
//
//     await waitFor(() => expect(screen.queryByText("Загружаю больше данных...")).not.toBeInTheDocument());
// });
//
// test("проверяет обработку ошибок API", async () => {
//     (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network error"));
//
//     render(<DataTable />);
//
//     await waitFor(() => expect(axios.get).toHaveBeenCalledWith("http://localhost:4000/records?_start=0&_limit=20"));
//
//     expect(screen.getByText("Произошла ошибка при загрузке данных. Попробуйте снова.")).toBeInTheDocument();
// });
//
// test("проверяет динамическое обновление полей таблицы", () => {
//     render(<DataTable />);
//
//     const addButton = screen.getByText("Добавить запись");
//     fireEvent.click(addButton);
//
//     fireEvent.change(screen.getByLabelText("name"), { target: { value: "Новый товар" } });
//     fireEvent.change(screen.getByLabelText("price"), { target: { value: "123.45" } });
//     fireEvent.change(screen.getByLabelText("newField"), { target: { value: "Test Value" } });
//
//     fireEvent.click(screen.getByText("Сохранить"));
//
//     expect(screen.getByText("Test Value")).toBeInTheDocument();
//     expect(screen.getByText("newField")).toBeInTheDocument();
// });
