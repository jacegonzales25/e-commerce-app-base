"use client";

import { useStoreModal } from "@/app/hooks/use-store-modal"
import { Modal } from "@/components/modal"

export const StoreModal = () => {
    const storeModal = useStoreModal();

    return(
        <Modal
            title="Create Store"
            description="Add a new store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Future Store Form
        </Modal>
    );
};