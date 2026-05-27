import { useEffect } from "react";
import { Switch, Route, useLocation, Router as WouterRouter, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { authClient } from "./lib/betterAuth";

import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Signals from "@/pages/Signals";
import Watchlist from "@/pages/Watchlist";
import Portfolio from "@/pages/Portfolio";
import Market from "@/pages/Market";
import Alerts from "@/pages/Alerts";
import Pricing from "@/pages/Pricing";
import Chat from "@/pages/Chat";
import Charts from "@/pages/Charts";
import News from "@/pages/News";
import PropFirm from "@/pages/PropFirm";
import Layout from "@/components/Layout";

const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

function routePath(path: string): string {
  return basePath && basePath !== "/" && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

function AuthFallback({ message }: { message?: string }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-bold mb-2">Authentication Unavailable</h2>
        <p className="text-sm text-muted-foreground mb-4">{message ?? "Better Auth is not configured for this environment."}</p>
        <a href={basePath || "/"} className="text-sm text-primary hover:underline">Return home</a>
      </div>
    </div>
  );
}

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <authClient.SignIn
        routing="path"
        signUpUrl={`${basePath}/sign-up`}
      />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <authClient.SignUp
        routing="path"
        signInUrl={`${basePath}/sign-in`}
      />
    </div>
  );
}

function HomeRedirect() {
  const { data: session } = authClient.useSession();
  if (session) return <Redirect to={routePath("/dashboard")} />;
  return <Home />;
}

function BetterAuthQueryClientCacheInvalidator() {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const prevUserIdRef = { current: undefined as string | null | undefined };
  
  useEffect(() => {
    const userId = session?.user?.id ?? null;
    if (
      prevUserIdRef.current !== undefined &&
      prevUserIdRef.current !== userId
    ) {
      queryClient.clear();
    }
    prevUserIdRef.current = userId;
  }, [session, queryClient]);

  return null;
}

function BetterAuthProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <authClient.AuthProvider
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <BetterAuthQueryClientCacheInvalidator />
        <TooltipProvider>
          <Switch>
            <Route path="/" component={HomeRedirect} />
            <Route path="/sign-in/*?" component={SignInPage} />
            <Route path="/sign-up/*?" component={SignUpPage} />
            <Route>
              <Layout>
                <Switch>
                  <Route path={routePath("/dashboard")} component={Dashboard} />
                  <Route path="/signals" component={Signals} />
                  <Route path="/charts" component={Charts} />
                  <Route path="/chat" component={Chat} />
                  <Route path="/watchlist" component={Watchlist} />
                  <Route path="/portfolio" component={Portfolio} />
                  <Route path="/prop" component={PropFirm} />
                  <Route path="/market" component={Market} />
                  <Route path="/news" component={News} />
                  <Route path="/alerts" component={Alerts} />
                  <Route path="/pricing" component={Pricing} />
                  <Route component={NotFound} />
                </Switch>
              </Layout>
            </Route>
          </Switch>
        </TooltipProvider>
      </QueryClientProvider>
    </authClient.AuthProvider>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <WouterRouter base={basePath}>
      <BetterAuthProviderWithRoutes />
      <Toaster />
    </WouterRouter>
  );
}

export default App;
