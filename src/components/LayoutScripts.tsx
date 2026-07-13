'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const LayoutScripts = () => {
  const pathname = usePathname();

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
