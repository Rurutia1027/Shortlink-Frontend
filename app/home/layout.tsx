'use client'

/**
 * Home Layout (Dashboard Layout)
 * Matches Vue router: component: () => import('@/views/home/HomeIndex.vue')
 * This layout wraps all /home/* routes
 */
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="home-layout">
      {/* Header/Sidebar will be added here (matches HomeIndex.vue) */}
      <main>{children}</main>
    </div>
  )
}
