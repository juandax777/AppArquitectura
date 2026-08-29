const ALLOWED_HOSTNAMES = new Set([
  'app-arquitectura-pearl.vercel.app',
  'localhost',
]);

/**
 * Bloquea copias automáticas que intenten ejecutar la aplicación desde otro
 * dominio. `hostname` no contiene el puerto, por eso localhost funciona con
 * el puerto que use Angular durante el desarrollo.
 */
export function isAllowedHostname(hostname: string): boolean {
  return ALLOWED_HOSTNAMES.has(hostname.trim().toLowerCase());
}

export function renderUnauthorizedHostPage(): void {
  document.title = 'Dominio no autorizado';

  const page = document.createElement('main');
  page.setAttribute('role', 'alert');
  page.style.cssText = [
    'min-height: 100vh',
    'display: grid',
    'place-items: center',
    'padding: 2rem',
    'background: #0f172a',
    'color: #e2e8f0',
    'font-family: system-ui, sans-serif',
    'text-align: center',
  ].join(';');

  const content = document.createElement('section');
  content.style.cssText = 'max-width: 42rem';

  const title = document.createElement('h1');
  title.textContent = 'Dominio no autorizado';
  title.style.cssText = 'font-size: clamp(2rem, 6vw, 4rem); margin: 0 0 1rem';

  const message = document.createElement('p');
  message.textContent =
    'Esta copia no puede ejecutar la aplicación. Utiliza únicamente el sitio oficial.';
  message.style.cssText = 'font-size: 1.125rem; line-height: 1.6; margin: 0 0 2rem';

  const officialLink = document.createElement('a');
  officialLink.href = 'https://app-arquitectura-pearl.vercel.app/login';
  officialLink.textContent = 'Ir al sitio oficial';
  officialLink.rel = 'noopener noreferrer';
  officialLink.style.cssText = [
    'display: inline-block',
    'padding: 0.8rem 1.2rem',
    'border-radius: 0.5rem',
    'background: #2563eb',
    'color: white',
    'font-weight: 700',
    'text-decoration: none',
  ].join(';');

  content.append(title, message, officialLink);
  page.append(content);
  document.body.replaceChildren(page);
}
