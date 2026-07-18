import { useCallback, useEffect, useState } from 'react';

export type ThemeName = 'retro' | 'futuristic';

const STORAGE_KEY = 'viewbens-theme';

function readTheme(): ThemeName {
  if (typeof document === 'undefined') return 'retro';
  return document.documentElement.dataset.theme === 'futuristic' ? 'futuristic' : 'retro';
}

/**
 * Theme state lives on <html data-theme> rather than in a React provider.
 * An inline script in index.html applies the saved theme before first paint,
 * so React only needs to read and update the attribute — no provider means
 * the toggle also works standalone in Storybook. Retro is the default; only
 * "futuristic" is ever written to the attribute or storage.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(readTheme);

  // Stay in sync if something else changes the attribute (e.g. a second
  // toggle instance, or Storybook flipping themes between stories).
  useEffect(() => {
    const observer = new MutationObserver(() => setThemeState(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  const setTheme = useCallback((next: ThemeName) => {
    if (next === 'futuristic') {
      document.documentElement.dataset.theme = 'futuristic';
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — theme simply won't persist */
    }
    setThemeState(next);
  }, []);

  return { theme, setTheme };
}
