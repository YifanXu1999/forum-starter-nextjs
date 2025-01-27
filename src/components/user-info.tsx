
import { auth } from "../auth"
import { Image } from "@heroui/image"
export default async function UserInfoClient() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div>
      <p>{JSON.stringify(session.user)}</p>
      <Image src={session.user.image || ""} alt="User Avatar" />
    </div>
  )
}