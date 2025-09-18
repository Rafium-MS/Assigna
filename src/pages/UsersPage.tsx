import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfirm } from '../components/feedback/ConfirmDialog';
import { Card, Button, Input, Label } from '../components/ui';
import { useUsers } from '../hooks/useUsers';
import type { User } from '../types/user';
import { AVAILABLE_ROLES, type UserRole } from '../constants/roles';

const DEFAULT_ROLE: UserRole = 'viewer';

const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const confirm = useConfirm();
  const { users, addUser, updateUser, removeUser } = useUsers();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>(DEFAULT_ROLE);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
  }, [users]);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setEmail('');
    setRole(DEFAULT_ROLE);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName) {
      return;
    }

    if (editingId) {
      await updateUser(editingId, { name: trimmedName, email: trimmedEmail, role });
    } else {
      await addUser({ name: trimmedName, email: trimmedEmail, role });
    }

    resetForm();
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  const handleDelete = async (user: User) => {
    const shouldDelete = await confirm(t('users.confirmDelete', { name: user.name }));
    if (!shouldDelete) {
      return;
    }

    await removeUser(user.id);
    if (editingId === user.id) {
      resetForm();
    }
  };

  return (
    <div className="grid gap-4">
      <Card title={editingId ? t('users.form.editTitle') : t('users.form.createTitle')}>
        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-4">
          <div className="grid gap-1">
            <Label htmlFor="user-name">{t('users.form.name')}</Label>
            <Input
              id="user-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={t('users.form.namePlaceholder')}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="user-email">{t('users.form.email')}</Label>
            <Input
              id="user-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t('users.form.emailPlaceholder')}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="user-role">{t('users.form.role')}</Label>
            <select
              id="user-role"
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900"
            >
              {AVAILABLE_ROLES.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {t(`users.roles.${roleOption}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end justify-end gap-2">
            {editingId && (
              <Button type="button" className="bg-neutral-100" onClick={resetForm}>
                {t('users.form.cancel')}
              </Button>
            )}
            <Button type="submit" className="bg-black text-white">
              {editingId ? t('users.form.update') : t('users.form.save')}
            </Button>
          </div>
        </form>
      </Card>

      <Card title={t('users.listTitle', { count: users.length })}>
        {sortedUsers.length === 0 ? (
          <p className="text-neutral-500">{t('users.empty')}</p>
        ) : (
          <div className="grid gap-3">
            {sortedUsers.map((user) => (
              <div
                key={user.id}
                className="rounded-xl border p-3 flex flex-col gap-3 bg-white dark:bg-neutral-900 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-neutral-600">
                    {user.email ? user.email : t('users.noEmail')}
                  </p>
                  <p className="text-sm text-neutral-500">{t(`users.roles.${user.role}`)}</p>
                </div>
                <div className="flex gap-2">
                  <Button type="button" className="bg-neutral-100" onClick={() => handleEdit(user)}>
                    {t('users.actions.edit')}
                  </Button>
                  <Button
                    type="button"
                    className="bg-red-50 text-red-700"
                    onClick={() => {
                      void handleDelete(user);
                    }}
                  >
                    {t('users.actions.delete')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default UsersPage;
