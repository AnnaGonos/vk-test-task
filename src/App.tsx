import React from 'react';
import DataTable from './components/DataTable/DataTable';

const App: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Таблица данных</h1>
            <DataTable />
        </div>
    );
};

export default App;
