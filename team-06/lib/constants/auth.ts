export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "parent" | "child";
}

export const MOCK_PARENT_USER: User & { passwordHash: string } = {
  id: "parent-001",
  name: "Parent User",
  email: "parent@conscious.com",
  username: "parent",
  passwordHash: "password123",
  role: "parent",
};
