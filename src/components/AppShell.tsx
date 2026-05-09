import { LogOut, Waves } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

import { logout } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const username = typeof window !== "undefined"
    ? localStorage.getItem("cascade-username")
    : null;

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      localStorage.removeItem("cascade-username");
      navigate({ to: "/login" });
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <Waves className="size-5 text-primary" />
            <span>Cascade</span>
          </div>
          <div className="flex-1" />
          {username && (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {username}
            </span>
          )}
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Sign out"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
