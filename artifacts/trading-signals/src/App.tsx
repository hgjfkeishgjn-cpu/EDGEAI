import { useEffect, useRef } from "react";
import { ClerkProvider, SignIn, SignUp, useUser, useClerk } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
import { Switch, Route, useLocation, Router as WouterRouter, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

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

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

const hostname = typeof window !== "undefined" ? window.location.hostname : "";
const origin = typeof window !== "undefined" ? window.location.origin : "";

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

let clerkPubKey = publishableKeyFromHost(hostname, clerkPublishableKey) ?? clerkPublishableKey;

if (!clerkPubKey) {
  // Don't throw in dev; provide a graceful fallback so the app can render.
  // In production you should set VITE_CLERK_PUBLISHABLE_KEY.
  // Keep clerkPubKey falsy to indicate Clerk is unavailable.
  // eslint-disable-next-line no-console
  console.warn("Missing Clerk publishable key in VITE_CLERK_PUBLISHABLE_KEY. Auth routes will show a fallback.");
  clerkPubKey = undefined as unknown as string;
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
    options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "hsl(210, 40%, 98%)",
    colorForeground: "hsl(210, 40%, 98%)",
    colorMutedForeground: "hsl(215, 20.2%, 65.1%)",
    colorDanger: "hsl(0, 62.8%, 30.6%)",
    colorBackground: "hsl(222.2, 84%, 4.9%)",
    colorInput: "hsl(217.2, 32.6%, 17.5%)",
    colorInputForeground: "hsl(210, 40%, 98%)",
    colorNeutral: "hsl(217.2, 32.6%, 17.5%)",
    fontFamily: "Inter, sans-serif",
    borderRadius: "0.25rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-background rounded-md w-[440px] max-w-full overflow-hidden border border-border",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-foreground",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButtonText: "text-foreground",
    formFieldLabel: "text-foreground",
    footerActionLink: "text-primary hover:text-primary/90",
    footerActionText: "text-muted-foreground",
    dividerText: "text-muted-foreground",
    identityPreviewEditButton: "text-primary",
    formFieldSuccessText: "text-primary",
    alertText: "text-foreground",
    logoBox: "",
    logoImage: "",
    socialButtonsBlockButton: "border-border hover:bg-accent",
    formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
    formFieldInput: "bg-background border-border text-foreground",
    footerAction: "",
    dividerLine: "bg-border",
    alert: "bg-background border border-border",
    otpCodeFieldInput: "bg-background border-border text-foreground",
    formFieldRow: "",
    main: "",
  },
};

function AuthFallback({ message }: { message?: string }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-bold mb-2">Authentication Unavailable</h2>
        <p className="text-sm text-muted-foreground mb-4">{message ?? "Clerk is not configured for this environment."}</p>
        <a href={basePath || "/"} className="text-sm text-primary hover:underline">Return home</a>
      </div>
    </div>
  );
}

function SignInPage() {
  if (!clerkPubKey) return <AuthFallback message={"Set VITE_CLERK_PUBLISHABLE_KEY to enable Clerk auth."} />;
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function SignUpPage() {
  if (!clerkPubKey) return <AuthFallback message={"Set VITE_CLERK_PUBLISHABLE_KEY to enable Clerk auth."} />;
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

function HomeRedirect() {
  const { isSignedIn } = useUser();
  if (isSignedIn) return <Redirect to={routePath("/dashboard")} />;
  return <Home />;
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const queryClient = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        queryClient.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, queryClient]);

  return null;
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: "EDGE AI Terminal",
            subtitle: "Sign in to access institutional intelligence",
          },
        },
        signUp: {
          start: {
            title: "Join EDGE AI",
            subtitle: "Get access to institutional intelligence",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
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
    </ClerkProvider>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
      <Toaster />
    </WouterRouter>
  );
}

export default App;
