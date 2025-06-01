import React, { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import { extractFields } from "../../utils/extractFields";

const BATCH_SIZE = 20;

const DataTable: React.FC = () => {
    const [tableData, setTableData] = useState<any[]>([]);
    const [loadedRows, setLoadedRows] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasRemainingData, setHasRemainingData] = useState<boolean>(true);
    const [allFields, setAllFields] = useState<string[]>([]);
    const [requiredFields, setRequiredFields] = useState<string[]>([]);
    const [optionalFields, setOptionalFields] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const observerTarget = useRef<HTMLDivElement | null>(null);

    const fetchNextBatch = useCallback(async () => {
        if (!hasRemainingData || isLoading) return;

        setIsLoading(true);

        try {
            console.log("Загрузка данных начиная с:", loadedRows);
            const response = await axios.get(
                `http://localhost:4000/records?_start=${loadedRows}&_limit=${BATCH_SIZE}`
            );
            const newData = response.data;

            if (newData.length > 0) {
                setTableData((prevData) => [...prevData, ...newData]);
                setLoadedRows((prevRows) => prevRows + newData.length);

                if (loadedRows === 0) {
                    const { requiredFields, optionalFields } = extractFields(newData);
                    setRequiredFields(requiredFields);
                    setOptionalFields(optionalFields);

                    const fields = [...requiredFields, ...optionalFields];
                    setAllFields(fields);
                }
            } else {
                setHasRemainingData(false);
                console.log("Все данные загружены");
            }
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            alert("Произошла ошибка при загрузке данных. Попробуйте снова.");
        } finally {
            setIsLoading(false);
        }
    }, [loadedRows, hasRemainingData, isLoading]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !isLoading) {
                    console.log("Sentinel detected. Loading more data...");
                    fetchNextBatch();
                }
            },
            {
                root: null,
                threshold: 0.1,
            }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [fetchNextBatch, isLoading]);

    const handleAddRecord = (newRecord: any) => {
        setTableData((prevData) => [...prevData, newRecord]);
        const newKeys = Object.keys(newRecord)
            .filter((key) => key !== "id")
            .filter((key) => !allFields.includes(key));
        if (newKeys.length > 0) {
            setAllFields((prevFields) => [...prevFields, ...newKeys]);
        }
    };

    return (
        <div style={{ height: "80vh", overflow: "auto", position: "relative" }}>
            <button onClick={() => setIsModalOpen(true)}>Добавить запись</button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddRecord}
                requiredFields={requiredFields}
                optionalFields={optionalFields}
            />

            <table border={1} cellPadding={10} cellSpacing={0} style={{ width: "100%" }}>
                <thead style={{ position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
                <tr>
                    {allFields.map((field) => (
                        <th key={field}>{field}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {tableData.map((row, index) => (
                    <tr key={index}>
                        {allFields.map((field) => (
                            <td key={field}>{row[field] || "-"}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Sentinel-элмеент для IntersectionObserver */}
            <div ref={observerTarget} style={{ height: "1px" }} />

            {isLoading && <div>Загружаю больше данных...</div>}
            {/*{!hasRemainingData && <div>Больше данных нет</div>}*/}
        </div>
    );
};

export default DataTable;
