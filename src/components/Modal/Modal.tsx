import React, {useState} from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (newRecord: any) => void;
    requiredFields: string[];
    optionalFields: string[];
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, onAdd, requiredFields, optionalFields}) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [customFields, setCustomFields] = useState<{ name: string; value: string }[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}));
        setErrors((prev) => ({...prev, [field]: value ? "" : "Это поле обязательно"}));
    };

    const handleCustomFieldChange = (index: number, field: "name" | "value", value: string) => {
        setCustomFields((prev) =>
            prev.map((item, i) => (i === index ? {...item, [field]: value} : item))
        );
        setErrors((prev) => {
            const newErrors = {...prev};
            const key = `custom_${index}_${field}`;
            newErrors[key] = value ? "" : "Это поле обязательно";
            return newErrors;
        });
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = "Это поле обязательно";
            }
        });

        customFields.forEach((field, index) => {
            if (!field.name) {
                newErrors[`custom_${index}_name`] = "Название поля обязательно";
            }
            if (!field.value) {
                newErrors[`custom_${index}_value`] = "Значение поля обязательно";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addCustomField = () => {
        if (validateForm()) {
            setCustomFields((prev) => [...prev, {name: "", value: ""}]);
        }
    };

    const removeCustomField = (index: number) => {
        setCustomFields((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const newRecord = {
                ...formData,
                ...customFields.reduce((acc, {name, value}) => {
                    if (name && value) acc[name] = value;
                    return acc;
                }, {} as { [key: string]: string }),
            };

            onAdd(newRecord);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }} >
            <div style={{background: "#fff", padding: "20px", borderRadius: "8px", width: "400px", zIndex: 1001 }}>
                <h3>Добавить запись</h3>

                {requiredFields.map((field) => (
                    <div key={field}>
                        <label>{field} (обязательное):</label>
                        <input type="text" value={formData[field] || ""}
                            onChange={(e) => handleChange(field, e.target.value)}
                        />
                        {errors[field] && <p style={{color: "red"}}>{errors[field]}</p>}
                    </div>
                ))}

                {optionalFields.map((field) => (
                    <div key={field}>
                        <label>{field} (необязательное):</label>
                        <input type="text" value={formData[field] || ""}
                            onChange={(e) => handleChange(field, e.target.value)}
                        />
                    </div>
                ))}

                {customFields.map((field, index) => (
                    <div key={index} style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                        <div>
                            <label>Название поля:</label>
                            <input
                                type="text"
                                value={field.name}
                                onChange={(e) => handleCustomFieldChange(index, "name", e.target.value)}
                            />
                            {errors[`custom_${index}_name`] && (
                                <p style={{color: "red"}}>{errors[`custom_${index}_name`]}</p>
                            )}
                        </div>
                        <div>
                            <label>Значение поля:</label>
                            <input
                                type="text"
                                value={field.value}
                                onChange={(e) => handleCustomFieldChange(index, "value", e.target.value)}
                            />
                            {errors[`custom_${index}_value`] && (
                                <p style={{color: "red"}}>{errors[`custom_${index}_value`]}</p>
                            )}
                        </div>
                        <button onClick={() => removeCustomField(index)}>Удалить</button>
                    </div>
                ))}

                <button onClick={addCustomField}>Добавить поле (+)</button>

                <div style={{marginTop: "20px"}}>
                    <button onClick={handleSubmit}>Сохранить</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
