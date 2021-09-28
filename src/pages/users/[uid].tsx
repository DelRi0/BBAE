import { useRouter } from "next/router"

const User = () => {
  const router = useRouter()
  const { uid, pid } = router.query

  return (
    <div>
      <p>User: {uid}</p>
      <br />
      <p>Pid: {pid}</p>
    </div>
  )
}

export default User
