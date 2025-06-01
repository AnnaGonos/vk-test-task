import React from "react";
import { render, screen } from "@testing-library/react";
import DataTable from "../components/DataTable/DataTable";

test("renders 'Add record' button", () => {
    render(<DataTable />);
    const addButton = screen.getByText(/добавить запись/i);
    expect(addButton).toBeInTheDocument();
});
