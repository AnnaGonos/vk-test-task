import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from "../components/DataTable/DataTable";


test('renders add button', () => {
    render(<DataTable />);
    const addButton = screen.getByText(/Добавить запись/i);
    expect(addButton).toBeInTheDocument();
});

test('renders table headers', async () => {
    render(<DataTable />);
    const headers = await screen.findAllByRole('columnheader');
    expect(headers.length).toBeGreaterThan(0);
});