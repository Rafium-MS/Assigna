import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfirm } from '../components/feedback/ConfirmDialog';
import { Card, Button, Input, Label } from '../components/ui';
import { useUsers } from '../hooks/useUsers';
import type { User } from '../types/user';
import { AVAILABLE_ROLES, type UserRole } from '../constants/roles';
import { useToast } from '../components/feedback/Toast';

const DEFAULT_ROLE: UserRole = 'viewer';

const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const confirm = useConfirm();
  const toast = useToast();
  const { users, addUser, updateUser, removeUser } = useUsers();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>(DEFAULT_ROLE);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
    );
  }, [users]);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setEmail('');
    setRole(DEFAULT_ROLE);
    setPassword('');
    setPasswordConfirm('');
    setIsSubmitting(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedPasswordConfirm = passwordConfirm.trim();
    if (!trimmedName) {
      return;
    }

    if (!editingId) {
      if (!trimmedPassword) {
        toast.error(t('users.form.passwordRequired'));
        return;
      }
      if (trimmedPassword !== trimmedPasswordConfirm) {
        toast.error(t('users.form.passwordMismatch'));
        return;
      }
    } else if (trimmedPassword || trimmedPasswordConfirm) {
      if (!trimmedPassword || !trimmedPasswordConfirm) {
        toast.error(t('users.form.passwordMismatch'));
        return;
      }
      if (trimmedPassword !== trimmedPasswordConfirm) {
        toast.error(t('users.form.passwordMismatch'));
        return;
      }
    }

    try {
      setIsSubmitting(true);
      if (editingId) {
        await updateUser(editingId, {
          name: trimmedName,
          email: trimmedEmail,
          role,
          password: trimmedPassword ? trimmedPassword : undefined,
        });
      } else {
        await addUser({
          name: trimmedName,
          email: trimmedEmail,
          role,
          password: trimmedPassword,
        });
      }

      resetForm();
    } catch (error) {
      if (error instanceof Error && error.message === 'PASSWORD_REQUIRED') {
        toast.error(t('users.form.passwordRequired'));
        return;
      }
      console.error('Failed to save user', error);
      toast.error(t('users.toast.saveError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setPassword('');
    setPasswordConfirm('');
  };

  const handleDelete = async (user: User) => {
    const shouldDelete = await confirm(
      t('users.confirmDelete', { name: user.name }),
    );
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
      <Card
        title={
          editingId ? t('users.form.editTitle') : t('users.form.createTitle')
        }
      >
        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-6">
          <div className="grid gap-1 md:col-span-2">
            <Label htmlFor="user-name">{t('users.form.name')}</Label>
            <Input
              id="user-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={t('users.form.namePlaceholder')}
            />
          </div>
          <div className="grid gap-1 md:col-span-2">
            <Label htmlFor="user-email">{t('users.form.email')}</Label>
            <Input
              id="user-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t('users.form.emailPlaceholder')}
            />
          </div>
          <div className="grid gap-1 md:col-span-2">
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
          <div className="grid gap-1 md:col-span-3">
            <Label htmlFor="user-password">{t('users.form.password')}</Label>
            <Input
              id="user-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t('users.form.passwordPlaceholder')}
              autoComplete={editingId ? 'new-password' : 'new-password'}
            />
          </div>
          <div className="grid gap-1 md:col-span-3">
            <Label htmlFor="user-password-confirm">
              {t('users.form.passwordConfirmation')}
            </Label>
            <Input
              id="user-password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              placeholder={t('users.form.passwordConfirmationPlaceholder')}
              autoComplete={editingId ? 'new-password' : 'new-password'}
            />
            <p className="text-xs text-neutral-500">
              {t('users.form.passwordHint')}
            </p>
          </div>
          <div className="flex items-end justify-end gap-2 md:col-span-6">
            {editingId && (
              <Button
                type="button"
                className="bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700"
                onClick={resetForm}
              >
                {t('users.form.cancel')}
              </Button>
            )}
            <Button
              type="submit"
              className="bg-black text-white"
              disabled={isSubmitting}
            >
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
                  <p className="text-sm text-neutral-500">
                    {t(`users.roles.${user.role}`)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    className="bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700"
                    onClick={() => handleEdit(user)}
                  >
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
