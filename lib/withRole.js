import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function withRole(Component, allowedRoles = []) {
  return function RoleProtectedComponent(props) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return
      if (!session || !allowedRoles.includes(session.user.role)) {
        router.replace('/auth/login')
      }
    }, [session, status, router])

    if (status === 'loading' || !session || !allowedRoles.includes(session.user.role)) {
      return null
    }

    return <Component {...props} />
  }
}
