export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (newRecord: any) => void;
    requiredFields: string[];
    optionalFields: string[];
}
