import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/auth/sign-in" />
    </div>
  )
}
