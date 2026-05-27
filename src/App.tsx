import { RouterProvider, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import Main from "./pages/Main";

const rootRoute = createRootRoute();

const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Main,
});

const router = createRouter({
  routeTree: rootRoute.addChildren([mainRoute]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
