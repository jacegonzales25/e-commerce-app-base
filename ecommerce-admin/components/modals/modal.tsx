"use client";

import { 
    Dialog, 
    DialogDescription, 
    DialogHeader, 
    DialogContent, 
    DialogTitle 
} from "@/components/ui/dialog";

// Interface for Modal component, interface is used to define the structure of an object.
interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

// Modal component, React.FC is a generic type that takes a type argument of a function component.
export const Modal: React.FC<ModalProps> = ({
    title, 
    description, 
    isOpen, 
    onClose, 
    children 

}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}    
                </div>    
            </DialogContent>  
        </Dialog>
    );
};