import { MOCK_PARENT_USER, User } from "@/lib/constants/auth";

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  redirectTo?: string;
}

export async function authenticateParent(
  identifier: string,
  password: string
): Promise<AuthResult> {
  // Simulate network latency for modular architecture
  await new Promise((resolve) => setTimeout(resolve, 300));

  const trimmedIdentifier = identifier.trim().toLowerCase();

  const isMatch =
    (trimmedIdentifier === MOCK_PARENT_USER.email.toLowerCase() ||
      trimmedIdentifier === MOCK_PARENT_USER.username.toLowerCase()) &&
    password === MOCK_PARENT_USER.passwordHash;

  if (isMatch) {
    const { passwordHash: _, ...userWithoutPassword } = MOCK_PARENT_USER;
    return {
      success: true,
      user: userWithoutPassword,
      redirectTo: "/dashboard",
    };
  }

  return {
    success: false,
    error: "Invalid email/username or password. Please try again.",
  };
}
