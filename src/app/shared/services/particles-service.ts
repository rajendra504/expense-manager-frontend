// particles.service.ts
// Inject in AppComponent → call this.particles.init() inside ngOnInit()
// Canvas is inserted as first child of body at z-index 1

import { Injectable, OnDestroy } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ParticlesService implements OnDestroy {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animId!: number;
  private particles: Particle[] = [];
  private resizeFn = () => this.resize();

  init(): void {
    const existing = document.getElementById('em-particles');
    if (existing) existing.remove();

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'em-particles';

    // Inline styles — applied immediately before any CSS can interfere
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '1',
      pointerEvents: 'none',
      display: 'block',
    });

    // First child of body so it sits behind everything
    document.body.insertBefore(this.canvas, document.body.firstChild);

    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;

    this.resize();
    window.addEventListener('resize', this.resizeFn);

    // Seed particles spread across screen on first load
    for (let i = 0; i < 70; i++) {
      this.particles.push(this.createParticle(true));
    }

    this.loop();
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private createParticle(randomY = false): Particle {
    const palettes = [
      'rgba(201, 168, 76,',   // gold
      'rgba(232, 213, 163,',  // gold light
      'rgba(45,  212, 160,',  // teal
      'rgba(91,  143, 212,',  // blue
      'rgba(255, 255, 255,',  // white
    ];
    const colorBase = palettes[Math.floor(Math.random() * palettes.length)];
    const size = Math.random() * 2.2 + 0.6;

    return {
      x: Math.random() * window.innerWidth,
      y: randomY ? Math.random() * window.innerHeight : window.innerHeight + size * 2,
      size,
      colorBase,
      speed: Math.random() * 0.45 + 0.15,
      drift: (Math.random() - 0.5) * 0.25,
      opacity: randomY ? Math.random() * 0.45 : 0,
      maxOpacity: Math.random() * 0.55 + 0.25,
      fadingIn: true,
    };
  }

  private loop(): void {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      if (p.fadingIn) {
        p.opacity += 0.015;
        if (p.opacity >= p.maxOpacity) {
          p.opacity = p.maxOpacity;
          p.fadingIn = false;
        }
      }

      if (!p.fadingIn && p.y < window.innerHeight * 0.20) {
        p.opacity -= 0.012;
      }

      p.y -= p.speed;
      p.x += p.drift;

      if (p.opacity > 0.01) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase} ${p.opacity.toFixed(3)})`;
        ctx.fill();
      }

      if (p.y < -p.size * 2 || p.opacity <= 0.01) {
        const fresh = this.createParticle(false);
        fresh.fadingIn = true;
        fresh.opacity = 0;
        this.particles[i] = fresh;
      }
    }

    this.animId = requestAnimationFrame(() => this.loop());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
    this.canvas?.remove();
    window.removeEventListener('resize', this.resizeFn);
  }
}


