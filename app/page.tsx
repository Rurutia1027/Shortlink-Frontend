import { redirect } from 'next/navigation'

/**
 * Root page - redirects to /space (matching Vue: / -> /home -> /home/space)
 */
export default function Home() {
  redirect('/space')
}
