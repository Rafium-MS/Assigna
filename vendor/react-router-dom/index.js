import * as React from 'react';

const RouterContext = React.createContext({
  location: { pathname: '/' },
  navigate: () => {
    throw new Error('navigate called outside of a router context');
  }
});

const isBrowser = typeof window !== 'undefined';

const readPathname = () => {
  if (!isBrowser) return '/';
  const { pathname } = window.location;
  return pathname || '/';
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
  const [pathname, setPathname] = React.useState(() => readPathname());

  React.useEffect(() => {
    if (!isBrowser) return undefined;
    const handler = () => {
      setPathname(readPathname());
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const navigate = React.useCallback((to, options = {}) => {
    const target = typeof to === 'string' ? to : to?.pathname ?? '/';
    if (isBrowser) {
      if (options.replace) {
        window.history.replaceState({}, '', target);
      } else {
        window.history.pushState({}, '', target);
      }
      setPathname(readPathname());
    } else {
      setPathname(target);
    }
  }, []);

  const location = React.useMemo(() => ({ pathname }), [pathname]);

  const value = React.useMemo(
    () => ({
      location,
      navigate
    }),
    [location, navigate]
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

export function Navigate({ to, replace = false }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    const target = typeof to === 'string' ? to : to?.pathname ?? '/';
    navigate(target, { replace });
  }, [navigate, replace, to]);
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

export function NavLink({
  to,
  className,
  children,
  end = false,
  onClick,
  ...rest
}) {
  const { location, navigate } = React.useContext(RouterContext);
  const href = typeof to === 'string' ? to : to?.pathname ?? '/';
  const isActive = end ? matchExact(href, location.pathname) : matchLoose(href, location.pathname);

  const classValue =
    typeof className === 'function'
      ? className({ isActive, isPending: false }) ?? undefined
      : className;

  const childValue =
    typeof children === 'function'
      ? children({ isActive, isPending: false })
      : children;

  const handleClick = event => {
    if (onClick) {
      onClick(event);
    }
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      (rest.target && rest.target !== '_self') ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(href);
  };

  return React.createElement(
    'a',
    {
      ...rest,
      href,
      className: classValue,
      'aria-current': isActive ? 'page' : undefined,
      onClick: handleClick
    },
    childValue
  );
}
