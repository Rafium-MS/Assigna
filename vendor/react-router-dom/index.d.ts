import * as React from 'react';

export interface BrowserRouterProps {
  children?: React.ReactNode;
}
export declare function BrowserRouter(props: BrowserRouterProps): React.ReactElement;

export interface RouteProps {
  path?: string;
  element?: React.ReactNode;
}
export declare function Route(props: RouteProps): null;

export interface RoutesProps {
  children?: React.ReactNode;
}
export declare function Routes(props: RoutesProps): React.ReactElement | null;

export interface NavLinkRenderProps {
  isActive: boolean;
  isPending: boolean;
}

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string | { pathname?: string };
  end?: boolean;
  state?: unknown;
  className?: string | ((props: NavLinkRenderProps) => string | undefined);
  children?: React.ReactNode | ((props: NavLinkRenderProps) => React.ReactNode);
}
export declare function NavLink(props: NavLinkProps): React.ReactElement;

export interface NavigateOptions {
  replace?: boolean;
  state?: unknown;
}
export declare function useNavigate(): (to: string | { pathname?: string }, options?: NavigateOptions) => void;

export interface Location {
  pathname: string;
  state?: unknown;
}
export declare function useLocation(): Location;

export interface NavigateProps {
  to: string | { pathname?: string };
  replace?: boolean;
  state?: unknown;
}
export declare function Navigate(props: NavigateProps): null;

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string | { pathname?: string };
  replace?: boolean;
  state?: unknown;
}
export declare function Link(props: LinkProps): React.ReactElement;
