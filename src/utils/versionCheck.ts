declare const __APP_VERSION__: string;
declare const __COMMIT_HASH__: string;

const VERSION_KEY = 'app_version';

export function checkVersionAndClearCache(): void {
  const currentVersion = `${__APP_VERSION__}-${__COMMIT_HASH__}`;
  const storedVersion = localStorage.getItem(VERSION_KEY);

  if (storedVersion && storedVersion !== currentVersion) {
    localStorage.setItem(VERSION_KEY, currentVersion);
    window.location.reload();
    return;
  }

  localStorage.setItem(VERSION_KEY, currentVersion);
}
