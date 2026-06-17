export interface NavLink {
  label: string;
  href: string;
}

export interface NavBarProps {
  wordmark: string;
  links: NavLink[];
  activeHref?: string;
}

export function NavBar({ wordmark, links, activeHref }: NavBarProps) {
  return (
    <nav data-component="navbar">
      <a href="/" data-nav="wordmark">
        {wordmark}
      </a>
      <ul role="list" data-nav="links">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              data-nav="link"
              aria-current={activeHref === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
