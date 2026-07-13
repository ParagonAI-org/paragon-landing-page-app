'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const FAVICON_SETS = {
  light: {
    icon: '/favicon-light.svg',
    png: '/favicon-light-96x96.png',
    apple: '/apple-touch-icon-light.png',
    manifest: '/site-light.webmanifest',
    themeColor: '#ffffff',
  },
  dark: {
    icon: '/favicon-dark.svg',
    png: '/favicon-dark-96x96.png',
    apple: '/apple-touch-icon-dark.png',
    manifest: '/site-dark.webmanifest',
    themeColor: '#000000',
  },
} as const;

type Theme = keyof typeof FAVICON_SETS;

const getResolvedTheme = (): Theme => {
  if (typeof document === 'undefined') return 'light';
  const root = document.documentElement;
  if (root.classList.contains('dark')) return 'dark';
  if (root.classList.contains('light')) return 'light';
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};

const applyFaviconTheme = (theme: Theme) => {
  const set = FAVICON_SETS[theme];
  const head = document.head;
  if (!head) return;

  // Replace the primary SVG icon
  let iconLink = document.querySelector<HTMLLinkElement>('link#dynamic-favicon-icon');
  if (!iconLink) {
    iconLink = document.createElement('link');
    iconLink.id = 'dynamic-favicon-icon';
    iconLink.rel = 'icon';
    iconLink.type = 'image/svg+xml';
    head.appendChild(iconLink);
  }
  iconLink.href = set.icon;

  // Replace the PNG fallback
  let pngLink = document.querySelector<HTMLLinkElement>('link#dynamic-favicon-png');
  if (!pngLink) {
    pngLink = document.createElement('link');
    pngLink.id = 'dynamic-favicon-png';
    pngLink.rel = 'alternate icon';
    pngLink.type = 'image/png';
    pngLink.sizes = '96x96';
    head.appendChild(pngLink);
  }
  pngLink.href = set.png;

  // Replace the apple touch icon
  let appleLink = document.querySelector<HTMLLinkElement>('link#dynamic-favicon-apple');
  if (!appleLink) {
    appleLink = document.createElement('link');
    appleLink.id = 'dynamic-favicon-apple';
    appleLink.rel = 'apple-touch-icon';
    appleLink.sizes = '180x180';
    head.appendChild(appleLink);
  }
  appleLink.href = set.apple;

  // Update theme-color meta
  let themeMeta = document.querySelector<HTMLMetaElement>('meta#dynamic-theme-color');
  if (!themeMeta) {
    themeMeta = document.createElement('meta');
    themeMeta.id = 'dynamic-theme-color';
    themeMeta.name = 'theme-color';
    head.appendChild(themeMeta);
  }
  themeMeta.content = set.themeColor;
};

const LayoutScripts = () => {
  const pathname = usePathname();

  // Theme-aware favicon swap (browsers don't respect media queries on favicon <link>s)
  useEffect(() => {
    applyFaviconTheme(getResolvedTheme());

    const observer = new MutationObserver(() => {
      applyFaviconTheme(getResolvedTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = () => applyFaviconTheme(getResolvedTheme());
    mql.addEventListener('change', onSystemChange);

    return () => {
      observer.disconnect();
      mql.removeEventListener('change', onSystemChange);
    };
  }, []);

  // Setup ambient canvas (only once)
  useEffect(() => {
    const canvas = document.getElementById('ambientCanvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
    }> = [];
    const particleCount = 25;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 150 + 80,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.04 + 0.015,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;

        const color = i % 2 === 0 ? '79, 70, 229' : '37, 99, 235';
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(${color},${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(${color},${p.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${color},0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    createParticles();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      // Don't start animation
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Setup reveal animations and re-run on route change
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.01,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Use a small delay to ensure DOM is ready after route change
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => {
        // Reset visible state so re-entry can re-trigger
        el.classList.remove('visible');
        observer.observe(el);
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
};

export default LayoutScripts;
