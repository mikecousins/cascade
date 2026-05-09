import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { QbitError, getVersion } from "@/lib/api";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async () => {
    try {
      await getVersion();
    } catch (err) {
      if (err instanceof QbitError && err.status === 403) {
        throw redirect({ to: "/login" });
      }
      throw err;
    }
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
