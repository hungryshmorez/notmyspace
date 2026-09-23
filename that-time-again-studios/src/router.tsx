import { createHashHistory, createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { Shell } from './components/Shell'
import { HomePage } from './routes/index'
import { ShowDetailPage } from './routes/shows.$slug'

const rootRoute = createRootRoute({
  component: () => <Shell><Outlet /></Shell>,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const showRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shows/$slug',
  component: ShowDetailPage,
})

const routeTree = rootRoute.addChildren([indexRoute, showRoute])

// The standalone build is opened straight from disk (file://), so it routes by hash.
const history = import.meta.env.MODE === 'standalone' ? createHashHistory() : undefined

export const router = createRouter({ routeTree, history, defaultPreload: 'intent' })

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}
