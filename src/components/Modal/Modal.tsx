import React, {useState} from "react";
import './Modal.css';
import {ModalProps} from "../../utils/Modal.types";

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
        <div className="modal-container">
            <div className="modal-content">
                <h3 className="modal-content__title">Добавить запись</h3>

                {requiredFields.map((field) => (
                    <div className="modal-content__item" key={field}>
                        <label>{field} (обязательное):</label>
                        <input type="text" value={formData[field] || ""}
                            onChange={(e) => handleChange(field, e.target.value)}
                        />
                        {errors[field] && <p style={{color: "red"}}>{errors[field]}</p>}
                    </div>
                ))}

                {optionalFields.map((field) => (
                    <div className="modal-content__item" key={field}>
                        <label>{field} (необязательное):</label>
                        <input type="text" value={formData[field] || ""}
                            onChange={(e) => handleChange(field, e.target.value)}
                        />
                    </div>
                ))}

                {customFields.map((field, index) => (
                    <div className="form-input" key={index}>
                        <div>
                            <input placeholder="Название поля" type="text" value={field.name} className="form-input__label"
                                onChange={(e) => handleCustomFieldChange(index, "name", e.target.value)}
                            />
                            {errors[`custom_${index}_name`] && (
                                <p style={{color: "red"}}>{errors[`custom_${index}_name`]}</p>
                            )}
                        </div>
                        <div>
                            <input placeholder="Значение поля" type="text" value={field.value} className="form-input__label"
                                onChange={(e) => handleCustomFieldChange(index, "value", e.target.value)}
                            />
                            {errors[`custom_${index}_value`] && (
                                <p style={{color: "red"}}>{errors[`custom_${index}_value`]}</p>
                            )}

                        </div>
                        <button className="button-danger" onClick={() => removeCustomField(index)}>-</button>
                    </div>
                ))}

                <button className="button-added" onClick={addCustomField}>Добавить поле</button>

                <div className="modal-content__actions">
                    <button className="button-primary" onClick={handleSubmit}>Сохранить</button>
                    <button className='button-secondary' onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
