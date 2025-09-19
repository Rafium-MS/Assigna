import type { User } from '../../types/user';
import { db, ensureAdminMasterUserSeeded } from '../db';

export const UserRepository = {
  async all(): Promise<User[]> {
    return db.users.toArray();
  },

  async findById(id: string): Promise<User | undefined> {
    const trimmed = id.trim();
    if (!trimmed) {
      return undefined;
    }
    return db.users.get(trimmed);
  },

  async findByEmail(email: string): Promise<User | undefined> {
    const trimmed = email.trim();
    if (!trimmed) {
      return undefined;
    }
    return db.users.where('email').equalsIgnoreCase(trimmed).first();
  },

  async add(user: User): Promise<void> {
    await db.users.put(user);
  },

  async update(user: User): Promise<void> {
    await db.users.put(user);
  },

  async bulkAdd(users: User[]): Promise<void> {
    if (users.length === 0) {
      return;
    }
    await db.users.bulkPut(users);
  },

  async remove(id: string): Promise<void> {
    await db.users.delete(id);
  },

  async clear(): Promise<void> {
    await db.users.clear();
    await ensureAdminMasterUserSeeded();
  },
};
