import * as React from 'react';

const RouterContext = React.createContext({
  location: { pathname: '/', state: undefined },
  navigate: () => {
    throw new Error('navigate called outside of a router context');
  },
});

const isBrowser = typeof window !== 'undefined';
const ROUTER_STATE_KEY = '__assigna_router_state__';

const createHistoryState = (pathname, state) => ({
  [ROUTER_STATE_KEY]: true,
  pathname,
  state,
});

const readLocation = (stateOverride) => {
  if (!isBrowser) {
    const candidate =
      stateOverride && typeof stateOverride === 'object'
        ? stateOverride
        : undefined;
    const rawPathname =
      typeof candidate?.pathname === 'string' && candidate.pathname.length > 0
        ? candidate.pathname
        : '/';
    return {
      pathname: normalizePath(rawPathname),
      state: candidate?.state,
    };
  }

  const { pathname } = window.location;
  const rawState = stateOverride ?? window.history.state;
  if (rawState && rawState[ROUTER_STATE_KEY]) {
    const storedPathname =
      typeof rawState.pathname === 'string' && rawState.pathname.length > 0
        ? rawState.pathname
        : pathname;
    return {
      pathname: normalizePath(storedPathname || '/'),
      state: rawState.state,
    };
  }

  return {
    pathname: normalizePath(pathname || '/'),
    state: undefined,
  };
};

function normalizePath(path) {
  if (!path) return '/';
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path;
}

function matchExact(path, pathname) {
  return normalizePath(path) === normalizePath(pathname);
}

function matchLoose(path, pathname) {
  const base = normalizePath(path);
  const target = normalizePath(pathname);
  if (base === '/') return target === '/';
  return target === base || target.startsWith(base + '/');
}

export function BrowserRouter({ children }) {
  const [location, setLocation] = React.useState(() => readLocation());

  React.useEffect(() => {
    if (!isBrowser) return undefined;
    const handler = () => {
      setLocation(readLocation());
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  React.useEffect(() => {
    if (!isBrowser) return undefined;
    const current = readLocation();
    const historyState = window.history.state;
    if (!historyState || historyState[ROUTER_STATE_KEY] !== true) {
      const normalizedPath = current.pathname;
      window.history.replaceState(
        createHistoryState(normalizedPath, current.state),
        '',
        normalizedPath,
      );
    }
    return undefined;
  }, []);

  const navigate = React.useCallback((to, options = {}) => {
    const target = typeof to === 'string' ? to : (to?.pathname ?? '/');
    const normalizedTarget = normalizePath(target);
    const state = options.state;
    if (isBrowser) {
      const historyState = createHistoryState(normalizedTarget, state);
      if (options.replace) {
        window.history.replaceState(historyState, '', normalizedTarget);
      } else {
        window.history.pushState(historyState, '', normalizedTarget);
      }
      setLocation({ pathname: normalizedTarget, state });
    } else {
      setLocation({ pathname: normalizedTarget, state });
    }
  }, []);

  const value = React.useMemo(
    () => ({
      location,
      navigate,
    }),
    [location, navigate],
  );

  return React.createElement(RouterContext.Provider, { value }, children);
}

export function useNavigate() {
  const context = React.useContext(RouterContext);
  if (!context) {
    throw new Error('useNavigate must be used within a BrowserRouter');
  }
  return context.navigate;
}

export function useLocation() {
  const context = React.useContext(RouterContext);
  if (!context) {
    throw new Error('useLocation must be used within a BrowserRouter');
  }
  return context.location;
}

export function Navigate({ to, replace = false, state }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    const target = typeof to === 'string' ? to : (to?.pathname ?? '/');
    navigate(target, { replace, state });
  }, [navigate, replace, state, to]);
  return null;
}

export function Routes({ children }) {
  const { location } = React.useContext(RouterContext);
  const pathname = location.pathname;
  const childArray = React.Children.toArray(children);

  for (const child of childArray) {
    if (!React.isValidElement(child)) continue;
    const { path = '*', element } = child.props || {};
    if (path === '*' || matchExact(path, pathname)) {
      return React.createElement(React.Fragment, null, element ?? null);
    }
  }

  return null;
}

export function Route() {
  return null;
}

function useHref(to) {
  return typeof to === 'string' ? to : (to?.pathname ?? '/');
}

function isModifiedEvent(event) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

export function Link({ to, onClick, replace = false, state, ...rest }) {
  const { navigate } = React.useContext(RouterContext);
  const href = useHref(to);

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      (rest.target && rest.target !== '_self') ||
      isModifiedEvent(event)
    ) {
      return;
    }

    event.preventDefault();
    navigate(href, { replace, state });
  };

  return React.createElement('a', { ...rest, href, onClick: handleClick });
}

export function NavLink({
  to,
  className,
  children,
  end = false,
  onClick,
  state,
  ...rest
}) {
  const { location, navigate } = React.useContext(RouterContext);
  const href = useHref(to);
  const isActive = end
    ? matchExact(href, location.pathname)
    : matchLoose(href, location.pathname);

  const classValue =
    typeof className === 'function'
      ? (className({ isActive, isPending: false }) ?? undefined)
      : className;

  const childValue =
    typeof children === 'function'
      ? children({ isActive, isPending: false })
      : children;

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      (rest.target && rest.target !== '_self') ||
      isModifiedEvent(event)
    ) {
      return;
    }
    event.preventDefault();
    navigate(href, { state });
  };

  return React.createElement(
    'a',
    {
      ...rest,
      href,
      className: classValue,
      'aria-current': isActive ? 'page' : undefined,
      onClick: handleClick,
    },
    childValue,
  );
}
