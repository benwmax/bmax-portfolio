import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router client-side navigation doesn't reset scroll position like a
// full page load does — without this, clicking a case study tile from
// partway down the homepage lands the user partway down the case study
// page instead of at the top.
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
