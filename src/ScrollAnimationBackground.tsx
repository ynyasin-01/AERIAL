import React, { useEffect, useRef, useState } from 'react';

const ScrollAnimationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const frameCount = 300;

  const getFrameUrl = (index: number) => {
    const rawBase = import.meta.env.BASE_URL || '/';
    const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
    return `${baseUrl}assets/ezgif/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;
  };

  const firstFrameUrl = getFrameUrl(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(frameCount + 1).fill(null);
    const isLoaded = new Uint8Array(frameCount + 1);

    let targetProgress = 0;
    let currentProgress = 0;
    let renderedFrame = -1;
    let animationFrameId: number;
    let isUnmounted = false;

    // Cover-fit image on canvas maintaining 16:9 aspect ratio and sharpness
    const drawImageCover = (img: HTMLImageElement) => {
      if (!img || !img.complete || !img.naturalWidth || !ctx || !canvas) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) * 0.5;
      const y = (ch - h) * 0.5;

      ctx.drawImage(img, x, y, w, h);
    };

    // Find closest available loaded frame to prevent any flicker or blank frame
    const getBestFrame = (target: number): HTMLImageElement | null => {
      if (images[target] && isLoaded[target]) {
        return images[target];
      }

      // Search nearest loaded neighbor
      for (let offset = 1; offset < frameCount; offset++) {
        const prev = target - offset;
        if (prev >= 1 && images[prev] && isLoaded[prev]) {
          return images[prev];
        }
        const next = target + offset;
        if (next <= frameCount && images[next] && isLoaded[next]) {
          return images[next];
        }
      }

      return (images[1] && isLoaded[1]) ? images[1] : null;
    };

    // Responsive high-DPI canvas sizing
    const handleResize = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      const img = getBestFrame(frameIdx);
      if (img) {
        drawImageCover(img);
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
        if (idx === 1) {
          setFirstFrameLoaded(true);
        }

        // If this loaded frame is what we should be displaying right now, draw it!
        const currentTarget = Math.max(
          1,
          Math.min(frameCount, Math.round(1 + currentProgress * (frameCount - 1)))
        );
        if (currentTarget === idx || renderedFrame === -1) {
          drawImageCover(img);
          renderedFrame = idx;
        }
      };

      img.src = getFrameUrl(idx);
      images[idx] = img;
      return img;
    };

    // Preload frames progressively to avoid network congestion and freezing
    const initPreload = () => {
      // 1. Priority: Frame 1 instant
      const firstImg = loadSingleFrame(1, true);
      if (firstImg.complete && firstImg.naturalWidth > 0) {
        isLoaded[1] = 1;
        setFirstFrameLoaded(true);
        drawImageCover(firstImg);
        renderedFrame = 1;
      }

      // 2. Preload keyframes first (every 4th frame: 5, 9, 13... up to 300)
      const keyframes: number[] = [];
      for (let i = 5; i <= frameCount; i += 4) {
        keyframes.push(i);
      }

      // 3. All remaining frames
      const remainingFrames: number[] = [];
      for (let i = 2; i <= frameCount; i++) {
        if (i % 4 !== 1) {
          remainingFrames.push(i);
        }
      }

      // Load batch helper with gentle scheduling
      const queue = [...keyframes, ...remainingFrames];
      let queueIdx = 0;
      const batchSize = 6;

      const loadNextBatch = () => {
        if (isUnmounted || queueIdx >= queue.length) return;
        const end = Math.min(queueIdx + batchSize, queue.length);
        for (let j = queueIdx; j < end; j++) {
          loadSingleFrame(queue[j]);
        }
        queueIdx = end;
        if (queueIdx < queue.length) {
          setTimeout(loadNextBatch, 80);
        }
      };

      // Start queue shortly after first frame
      setTimeout(loadNextBatch, 150);
    };

    // Calculate normalized scroll progress (0 to 1)
    const updateTargetProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));

      // Dynamically load frames around current target for instant response
      const targetFrame = Math.max(
        1,
        Math.min(frameCount, Math.round(1 + targetProgress * (frameCount - 1)))
      );
      for (let off = -3; off <= 3; off++) {
        const f = targetFrame + off;
        if (f >= 1 && f <= frameCount && !images[f]) {
          loadSingleFrame(f);
        }
      }
    };

    // Physics-damped animation loop (60/120Hz smooth lerp)
    const tick = () => {
      if (isUnmounted) return;

      const lerpFactor = 0.08;
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

      if (targetFrame !== renderedFrame) {
        const img = getBestFrame(targetFrame);
        if (img && img.complete && img.naturalWidth > 0) {
          drawImageCover(img);
          renderedFrame = targetFrame;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    // Attach listeners
    window.addEventListener('scroll', updateTargetProgress, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial setup
    handleResize();
    initPreload();
    updateTargetProgress();
    currentProgress = targetProgress;
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      isUnmounted = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', updateTargetProgress);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-black flex justify-center items-center">
      {/* Instant Fallback Poster Image to ensure NO black screen even during initial load */}
      <img
        src={firstFrameUrl}
        alt="Aerial Background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 select-none pointer-events-none ${
          firstFrameLoaded ? 'opacity-85' : 'opacity-60'
        }`}
        loading="eager"
      />

      {/* High-DPI Smooth Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-700"
      />

      {/* Cinematic subtle contrast vignette for crystal clear text readability across all sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
};

export default ScrollAnimationBackground;
