import { User } from '../types';

const USERS_KEY = 'botbuster_users';
const CURRENT_USER_KEY = 'botbuster_current_user';

export const getStoredUsers = (): Record<string, { password: string; email: string }> => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const storeUser = (username: string, password: string, email: string): void => {
  const users = getStoredUsers();
  users[username] = { password, email };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const validateLogin = (username: string, password: string): boolean => {
  const users = getStoredUsers();
  return users[username]?.password === password;
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const registerUser = (username: string, password: string, email: string): boolean => {
  const users = getStoredUsers();
  if (users[username]) {
    return false; // User already exists
  }
  storeUser(username, password, email);
  return true;
};