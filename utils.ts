// TypeScript工具函数示例
export interface User {
  id: number;
  name: string;
  email: string;
}

export class UserManager {
  private users: User[] = [];

  addUser(user: Omit<User, 'id'>): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...user
    };
    this.users.push(newUser);
    return newUser;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  getAllUsers(): User[] {
    return [...this.users];
  }
}

// 泛型函数示例
export function formatResponse<T>(data: T, success: boolean = true) {
  return {
    success,
    data,
    timestamp: new Date().toISOString()
  };
}