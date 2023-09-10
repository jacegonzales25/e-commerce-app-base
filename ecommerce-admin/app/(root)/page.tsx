"use client";

import { useStoreModal } from "@/app/hooks/use-store-modal";
import { useEffect } from "react";

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  
  return (
    <div className="p-4">
      Root Page
      
      
      {/* <Modal title="test" description="Test Description" isOpen onClose={() => {}}>
        Children
      </Modal> */}
      {/* <UserButton afterSignOutUrl="/auth/sign-in" /> */}
    
    </div>
  )
}
