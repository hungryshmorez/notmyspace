import { createHashHistory, createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { Shell } from './components/Shell'
import { HomePage } from './routes/index'
import { BooksPage } from './routes/books'
import { RecordsPage } from './routes/records'
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

const recordsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/records',
  component: RecordsPage,
})

const booksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/books',
  component: BooksPage,
})

const routeTree = rootRoute.addChildren([indexRoute, showRoute, recordsRoute, booksRoute])

// The standalone build is opened straight from disk (file://), so it routes by hash.
const history = import.meta.env.MODE === 'standalone' ? createHashHistory() : undefined

export const router = createRouter({ routeTree, history, defaultPreload: 'intent', scrollRestoration: true })

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}
