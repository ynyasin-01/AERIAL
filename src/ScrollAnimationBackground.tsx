import React, { useEffect, useRef } from 'react';

const ScrollAnimationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCount = 300;

  const getFrameUrl = (index: number) => {
    const rawBase = import.meta.env.BASE_URL || '/';
    const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
    return `${baseUrl}assets/ezgif/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(frameCount + 1).fill(null);
    const isLoaded = new Uint8Array(frameCount + 1);

    let targetProgress = 0;
    let currentProgress = 0;
    let currentlyDrawnFrame = -1;
    let animationFrameId: number;
    let isUnmounted = false;
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    // Render frame: Desktop maintains exact cover fit; Mobile seamlessly fits the portrait screen
    const renderFrame = (img: HTMLImageElement) => {
      if (!img || !img.complete || !img.naturalWidth || !ctx || !canvas) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        // Desktop version - 100% UNCHANGED
        const scale = Math.max(cw / iw, ch / ih);
        const w = iw * scale;
        const h = ih * scale;
        const x = (cw - w) * 0.5;
        const y = (ch - h) * 0.5;
        ctx.drawImage(img, x, y, w, h);
      } else {
        // Mobile platform: Fit the background seamlessly with the portrait screen
        const scale = Math.max(cw / iw, ch / ih);
        const w = iw * scale;
        const h = ih * scale;

        const isPortrait = ch > cw;
        if (!isPortrait) {
          // Mobile in landscape orientation - standard centered cover fit
          const x = (cw - w) * 0.5;
          const y = (ch - h) * 0.5;
          ctx.drawImage(img, x, y, w, h);
        } else {
          // Mobile in portrait orientation:
          // Dynamically track visual focal interest across frames:
          // - In Hero (frames 1-35, progress 0 -> 0.28): Airplane is centered at x ~ 0.77 (cockpit, windows & fuselage in full view)
          // - Scrolling into Destinations & beyond (progress >= 0.28): Smoothly pans to center (x = 0.50) where Mount Everest summit is located
          let focalX = 0.50;
          if (currentProgress < 0.28) {
            const t = currentProgress / 0.28;
            const ease = t * t * (3 - 2 * t);
            focalX = 0.77 - 0.27 * ease;
          }

          const targetX = cw * 0.5 - w * focalX;
          const x = Math.max(cw - w, Math.min(0, targetX));
          const y = (ch - h) * 0.5;

          ctx.drawImage(img, x, y, w, h);
        }
      }
    };

    // Find the best loaded frame and return both image and its real frame number
    const getBestAvailableFrame = (target: number): { img: HTMLImageElement; index: number } | null => {
      if (images[target] && isLoaded[target]) {
        return { img: images[target]!, index: target };
      }

      // Search nearest loaded neighbor
      for (let offset = 1; offset < frameCount; offset++) {
        const prev = target - offset;
        if (prev >= 1 && images[prev] && isLoaded[prev]) {
          return { img: images[prev]!, index: prev };
        }
        const next = target + offset;
        if (next <= frameCount && images[next] && isLoaded[next]) {
          return { img: images[next]!, index: next };
        }
      }

      if (images[1] && isLoaded[1]) {
        return { img: images[1]!, index: 1 };
      }

      return null;
    };

    // Responsive high-DPI canvas sizing (optimized DPR for mobile 60-120fps, desktop unchanged)
    const handleResize = (force = false) => {
      if (!canvas || !ctx) return;
      const isMobile = window.innerWidth < 768;

      // On mobile, ignore small vertical-only address bar jitter during scrolling
      if (!force && isMobile && Math.abs(window.innerWidth - lastWidth) < 12 && Math.abs(window.innerHeight - lastHeight) < 70) {
        return;
      }
      lastWidth = window.innerWidth;
      lastHeight = window.innerHeight;

      // Universally upscale the DPR for maximum crispness
      const dpr = Math.min(window.devicePixelRatio || 2, 3);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Redraw current frame upon resize
      const frameIdx = Math.max(
        1,
        Math.min(frameCount, Math.round(1 + currentProgress * (frameCount - 1)))
      );
      const best = getBestAvailableFrame(frameIdx);
      if (best) {
        renderFrame(best.img);
        currentlyDrawnFrame = best.index;
      }
    };

    const loadSingleFrame = (idx: number, priority = false): HTMLImageElement => {
      if (images[idx]) return images[idx]!;

      const img = new Image();
      if (priority && 'fetchPriority' in img) {
        (img as any).fetchPriority = 'high';
      }

      img.onload = () => {
        if (isUnmounted) return;
        isLoaded[idx] = 1;
      };

      img.src = getFrameUrl(idx);
      images[idx] = img;
      return img;
    };

    // Preload frames progressively
    const initPreload = () => {
      // 1. Frame 1 with high priority
      const firstImg = loadSingleFrame(1, true);
      if (firstImg.complete && firstImg.naturalWidth > 0) {
        isLoaded[1] = 1;
        renderFrame(firstImg);
        currentlyDrawnFrame = 1;
      }

      // 2. Preload first 20 frames immediately for instant responsiveness
      for (let i = 2; i <= Math.min(25, frameCount); i++) {
        loadSingleFrame(i);
      }

      // 3. Stream remaining frames in batches
      let streamIdx = 26;
      const streamNext = () => {
        if (isUnmounted || streamIdx > frameCount) return;
        const end = Math.min(streamIdx + 6, frameCount);
        for (let i = streamIdx; i <= end; i++) {
          loadSingleFrame(i);
        }
        streamIdx = end + 1;
        if (streamIdx <= frameCount) {
          setTimeout(streamNext, 10);
        }
      };

      setTimeout(streamNext, 50);
    };

    // Calculate normalized scroll progress (0 to 1)
    const updateTargetProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));

      // Dynamically prioritize loading frames around active scroll position
      const targetFrame = Math.max(
        1,
        Math.min(frameCount, Math.round(1 + targetProgress * (frameCount - 1)))
      );
      for (let off = -5; off <= 10; off++) {
        const f = targetFrame + off;
        if (f >= 1 && f <= frameCount && !images[f]) {
          loadSingleFrame(f, true);
        }
      }
    };

    // Physics-damped animation loop (silky smooth 60/120fps lerp)
    let lastTime = performance.now();
    const tick = (now: number) => {
      if (isUnmounted) return;

      const isMobile = window.innerWidth < 768;
      // Use much snappier factors for higher perceived FPS
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const baseFactor = isMobile ? 0.35 : 0.15;
      const lerpFactor = 1 - Math.pow(1 - baseFactor, dt * 60);

      const delta = targetProgress - currentProgress;
      if (Math.abs(delta) > 0.00004) {
        currentProgress += delta * lerpFactor;
      } else {
        currentProgress = targetProgress;
      }

      const targetFrame = Math.max(
        1,
        Math.min(frameCount, Math.round(1 + currentProgress * (frameCount - 1)))
      );

      const best = getBestAvailableFrame(targetFrame);
      if (best && best.img.complete && best.img.naturalWidth > 0) {
        if (best.index !== currentlyDrawnFrame) {
          renderFrame(best.img);
          currentlyDrawnFrame = best.index;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    // Attach listeners
    window.addEventListener('scroll', updateTargetProgress, { passive: true });
    const onResize = () => handleResize(false);
    const onOrientationChange = () => handleResize(true);

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onOrientationChange, { passive: true });

    // Initial setup
    handleResize(true);
    initPreload();
    updateTargetProgress();
    currentProgress = targetProgress;
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      isUnmounted = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', updateTargetProgress);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrientationChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-black flex justify-center items-center">
      {/* High-DPI Smooth Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      />

      {/* Cinematic subtle contrast vignette for crystal clear text readability across all sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
};

export default ScrollAnimationBackground;
