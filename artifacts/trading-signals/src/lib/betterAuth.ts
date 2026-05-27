// Auth configuration - using simple mock auth for demo
// Replace with real auth provider when ready

export const authClient = {
  useSession: () => ({ data: { session: null, user: null }, isPending: false }),
  useSignOut: () => () => Promise.resolve(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  SignIn: () => null,
  SignUp: () => null,
} as any;
