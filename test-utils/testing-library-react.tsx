import type { ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { act as reactAct } from 'react';

if (typeof globalThis !== 'undefined') {
  (globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;
}

export const act = reactAct;

interface MountedContainer {
  container: HTMLElement;
  root: Root;
}

const mountedContainers = new Set<MountedContainer>();

function cleanupContainer(entry: MountedContainer): void {
  if (!mountedContainers.has(entry)) {
    return;
  }

  reactAct(() => {
    entry.root.unmount();
  });

  if (entry.container.parentNode) {
    entry.container.parentNode.removeChild(entry.container);
  }

  mountedContainers.delete(entry);
}

export function cleanup(): void {
  for (const entry of Array.from(mountedContainers)) {
    cleanupContainer(entry);
  }
}

export interface RenderResult {
  container: HTMLElement;
  rerender: (ui: ReactElement) => void;
  unmount: () => void;
}

export function render(ui: ReactElement): RenderResult {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container);
  const entry: MountedContainer = { container, root };
  mountedContainers.add(entry);

  reactAct(() => {
    root.render(ui);
  });

  return {
    container,
    rerender: (nextUi: ReactElement) => {
      reactAct(() => {
        root.render(nextUi);
      });
    },
    unmount: () => {
      cleanupContainer(entry);
    },
  };
}

type TextMatcher = string | RegExp;

function matchText(content: string, matcher?: TextMatcher): boolean {
  if (matcher === undefined) {
    return true;
  }

  if (typeof matcher === 'string') {
    return content.trim() === matcher;
  }

  return matcher.test(content);
}

function getElementText(element: Element): string {
  return element.textContent?.trim() ?? '';
}

function queryAllByText(container: HTMLElement, matcher: TextMatcher): HTMLElement[] {
  const elements = Array.from(container.querySelectorAll<HTMLElement>('*'));
  return elements.filter((element) => matchText(getElementText(element), matcher));
}

function getByText(container: HTMLElement, matcher: TextMatcher): HTMLElement {
  const matches = queryAllByText(container, matcher);
  if (matches.length === 0) {
    throw new Error(`Unable to find an element with text: ${String(matcher)}`);
  }
  return matches[0];
}

function queryByText(container: HTMLElement, matcher: TextMatcher): HTMLElement | null {
  const matches = queryAllByText(container, matcher);
  return matches[0] ?? null;
}

function getRole(element: Element): string | null {
  const explicitRole = element.getAttribute('role');
  if (explicitRole) {
    return explicitRole;
  }

  switch (element.tagName.toLowerCase()) {
    case 'button':
      return 'button';
    case 'select':
      return 'combobox';
    case 'input': {
      const type = (element as HTMLInputElement).type;
      if (type === 'number') {
        return 'spinbutton';
      }
      return 'textbox';
    }
    default:
      return null;
  }
}

interface RoleOptions {
  name?: TextMatcher;
}

function queryAllByRole(container: HTMLElement, role: string, options?: RoleOptions): HTMLElement[] {
  const elements = Array.from(container.querySelectorAll<HTMLElement>('*'));
  return elements.filter((element) => {
    const elementRole = getRole(element);
    if (elementRole !== role) {
      return false;
    }

    if (options?.name !== undefined) {
      return matchText(getElementText(element), options.name);
    }

    return true;
  });
}

function getAllByRole(container: HTMLElement, role: string, options?: RoleOptions): HTMLElement[] {
  const matches = queryAllByRole(container, role, options);
  if (matches.length === 0) {
    throw new Error(`Unable to find an element with role: ${role}`);
  }
  return matches;
}

function getByRole(container: HTMLElement, role: string, options?: RoleOptions): HTMLElement {
  const matches = getAllByRole(container, role, options);
  return matches[0];
}

function queryByRole(container: HTMLElement, role: string, options?: RoleOptions): HTMLElement | null {
  const matches = queryAllByRole(container, role, options);
  return matches[0] ?? null;
}

function getByPlaceholderText(container: HTMLElement, matcher: TextMatcher): HTMLElement {
  const elements = Array.from(container.querySelectorAll<HTMLElement>('[placeholder]'));
  for (const element of elements) {
    const placeholder = element.getAttribute('placeholder') ?? '';
    if (matchText(placeholder, matcher)) {
      return element;
    }
  }
  throw new Error(`Unable to find an element with placeholder: ${String(matcher)}`);
}

function escapeTestId(value: string): string {
  return value.replace(/"/g, '\\"');
}

function getByTestId(container: HTMLElement, testId: string): HTMLElement {
  const selector = `[data-testid="${escapeTestId(testId)}"]`;
  const element = container.querySelector<HTMLElement>(selector);
  if (!element) {
    throw new Error(`Unable to find an element with test id: ${testId}`);
  }
  return element;
}

export const screen = {
  getByText: (matcher: TextMatcher) => getByText(document.body, matcher),
  queryByText: (matcher: TextMatcher) => queryByText(document.body, matcher),
  getByRole: (role: string, options?: RoleOptions) => getByRole(document.body, role, options),
  queryByRole: (role: string, options?: RoleOptions) => queryByRole(document.body, role, options),
  getAllByRole: (role: string, options?: RoleOptions) => getAllByRole(document.body, role, options),
  getByPlaceholderText: (matcher: TextMatcher) => getByPlaceholderText(document.body, matcher),
  getByTestId: (testId: string) => getByTestId(document.body, testId),
};

interface WaitForOptions {
  timeout?: number;
  interval?: number;
}

export async function waitFor<T>(callback: () => T | Promise<T>, options: WaitForOptions = {}): Promise<T> {
  const { timeout = 1000, interval = 16 } = options;
  const endTime = Date.now() + timeout;
  let lastError: unknown;

  while (Date.now() < endTime) {
    try {
      let callbackResult: T | undefined;
      await reactAct(async () => {
        callbackResult = await callback();
      });
      return callbackResult as T;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }

  throw lastError ?? new Error('Timed out in waitFor.');
}

export interface RenderHookResult<T> {
  result: { current: T };
  rerender: () => void;
  unmount: () => void;
}

export function renderHook<T>(callback: () => T): RenderHookResult<T> {
  const result: { current: T } = {
    current: undefined as unknown as T,
  };

  function HookWrapper(): null {
    result.current = callback();
    return null;
  }

  const renderResult = render(<HookWrapper />);

  return {
    result,
    rerender: () => {
      renderResult.rerender(<HookWrapper />);
    },
    unmount: renderResult.unmount,
  };
}
