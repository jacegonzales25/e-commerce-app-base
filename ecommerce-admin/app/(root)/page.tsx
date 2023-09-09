"use client";

import { Modal } from "@/components/modal";
import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="p-4">
      <Modal title="test" description="Test Description" isOpen onClose={() => {}}>
        Children
      </Modal>
      {/* <UserButton afterSignOutUrl="/auth/sign-in" /> */}
    </div>
  )
}
