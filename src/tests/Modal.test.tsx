import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import Modal from "../components/Modal/Modal";

test("проверяет отображение модального окна", () => {
    const requiredFields = ["name", "price"];
    const optionalFields = ["description"];

    render(
        <Modal
            isOpen={true}
            onClose={jest.fn()}
            onAdd={jest.fn()}
            requiredFields={requiredFields}
            optionalFields={optionalFields}
        />
    );

    expect(screen.getByText("Добавить запись")).toBeInTheDocument();
    expect(screen.getByLabelText("name (обязательное):")).toBeInTheDocument();
    expect(screen.getByLabelText("price (обязательное):")).toBeInTheDocument();
    expect(screen.getByLabelText("description (необязательное):")).toBeInTheDocument();
});


// test("проверяет обработку изменения значений полей", () => {
//     const requiredFields = ["name", "price"];
//     const optionalFields = ["description"];
//
//     render(
//         <Modal
//             isOpen={true}
//             onClose={jest.fn()}
//             onAdd={jest.fn()}
//             requiredFields={requiredFields}
//             optionalFields={optionalFields}
//         />
//     );
//
//     const nameInput = screen.getByLabelText("name (обязательное):");
//     const priceInput = screen.getByLabelText("price (обязательное):");
//     const descriptionInput = screen.getByLabelText("description (необязательное):");
//
//     fireEvent.change(nameInput, { target: { value: "Новый товар" } });
//     fireEvent.change(priceInput, { target: { value: "123.45" } });
//     fireEvent.change(descriptionInput, { target: { value: "Описание нового товара" } });
//
//     expect(nameInput).toHaveValue("Новый товар");
//     expect(priceInput).toHaveValue("123.45");
//     expect(descriptionInput).toHaveValue("Описание нового товара");
// });


// test("проверяет валидацию формы", () => {
//     const requiredFields = ["name", "price"];
//     const optionalFields = [];
//     const onAddMock = jest.fn();
//
//     render(
//         <Modal
//             isOpen={true}
//             onClose={jest.fn()}
//             onAdd={onAddMock}
//             requiredFields={requiredFields}
//             optionalFields={optionalFields}
//         />
//     );
//
//     const saveButton = screen.getByText("Сохранить");
//     fireEvent.click(saveButton);
//
//     expect(screen.getByText("Это поле обязательно")).toBeInTheDocument();
//     expect(onAddMock).not.toHaveBeenCalled();
// });

// test("проверяет закрытие модального окна", () => {
//     const onCloseMock = jest.fn();
//     const requiredFields = [];
//     const optionalFields = [];
//
//     render(
//         <Modal
//             isOpen={true}
//             onClose={onCloseMock}
//             onAdd={jest.fn()}
//             requiredFields={requiredFields}
//             optionalFields={optionalFields}
//         />
//     );
//
//     const cancelButton = screen.getByText("Отмена");
//     fireEvent.click(cancelButton);
//
//     expect(onCloseMock).toHaveBeenCalledTimes(1);
// });

// test("проверяет добавление пользовательского поля с ошибкой", () => {
//     const requiredFields = ["name"];
//     const optionalFields = [];
//     const onAddMock = jest.fn();
//
//     render(
//         <Modal
//             isOpen={true}
//             onClose={jest.fn()}
//             onAdd={onAddMock}
//             requiredFields={requiredFields}
//             optionalFields={optionalFields}
//         />
//     );
//
//     const addButton = screen.getByText("Добавить поле");
//     fireEvent.click(addButton);
//
//     expect(screen.getByText("Название поля обязательно")).toBeInTheDocument();
//     expect(screen.getByText("Значение поля обязательно")).toBeInTheDocument();
// });
