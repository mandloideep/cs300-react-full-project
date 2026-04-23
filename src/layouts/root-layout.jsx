import { motion } from 'framer-motion'
import { Home, Info } from 'lucide-react'
import { NavLink, Outlet } from 'react-router'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/about', label: 'About', icon: Info },
]

function navClassName({ isActive }) {
  return [
    'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
  ].join(' ')
}

export function RootLayout() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6">
      <header className="mb-6 rounded-xl border bg-card/95 p-4 backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <motion.h1
            className="text-xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            React Starter Stack
          </motion.h1>
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink key={item.to} to={item.to} className={navClassName} end={item.to === '/'}>
                  <Icon size={16} />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
