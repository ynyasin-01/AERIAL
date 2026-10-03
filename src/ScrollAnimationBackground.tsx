import React, { useEffect, useRef, useState } from 'react';

const ScrollAnimationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
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

    // Find closest available loaded frame and return both image and its actual index
    const getBestFrame = (target: number): { img: HTMLImageElement; index: number } | null => {
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
      const frameData = getBestFrame(frameIdx);
      if (frameData) {
        drawImageCover(frameData.img);
        renderedFrame = frameData.index;
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
          setCanvasReady(true);
        }

        // If no frame has been drawn yet, or if this loaded frame is closer to target than what's rendered
        const targetFrame = Math.max(
          1,
          Math.min(frameCount, Math.round(1 + currentProgress * (frameCount - 1)))
        );
        const distCurrent = Math.abs(renderedFrame - targetFrame);
        const distNew = Math.abs(idx - targetFrame);

        if (renderedFrame === -1 || distNew < distCurrent) {
          drawImageCover(img);
          renderedFrame = idx;
          setCanvasReady(true);
        }
      };

      img.src = getFrameUrl(idx);
      images[idx] = img;
      return img;
    };

    // Preload frames in quick progressive stream
    const initPreload = () => {
      // 1. Frame 1 with high priority
      const firstImg = loadSingleFrame(1, true);
      if (firstImg.complete && firstImg.naturalWidth > 0) {
        isLoaded[1] = 1;
        drawImageCover(firstImg);
        renderedFrame = 1;
        setCanvasReady(true);
      }

      // 2. Stream-load all remaining frames in fast batches of 5 every 25ms
      let streamIdx = 2;
      const streamNext = () => {
        if (isUnmounted || streamIdx > frameCount) return;
        const end = Math.min(streamIdx + 5, frameCount);
        for (let i = streamIdx; i <= end; i++) {
          loadSingleFrame(i);
        }
        streamIdx = end + 1;
        if (streamIdx <= frameCount) {
          setTimeout(streamNext, 25);
        }
      };

      // Start stream immediately after first frame
      setTimeout(streamNext, 50);
    };

    // Calculate normalized scroll progress (0 to 1)
    const updateTargetProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));

      // Immediately prioritize downloading frames around active scroll position
      const targetFrame = Math.max(
        1,
        Math.min(frameCount, Math.round(1 + targetProgress * (frameCount - 1)))
      );
      for (let off = -4; off <= 8; off++) {
        const f = targetFrame + off;
        if (f >= 1 && f <= frameCount && !images[f]) {
          loadSingleFrame(f, true);
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

      const frameData = getBestFrame(targetFrame);
      if (frameData && frameData.img.complete && frameData.img.naturalWidth > 0) {
        if (frameData.index !== renderedFrame) {
          drawImageCover(frameData.img);
          renderedFrame = frameData.index;
          if (!canvasReady) {
            setCanvasReady(true);
          }
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
      {/* Fallback Poster Image: ONLY visible on initial paint, fades out completely once canvas renders */}
      <img
        src={firstFrameUrl}
        alt="Aerial Background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 select-none pointer-events-none ${
          canvasReady ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
      />

      {/* High-DPI Smooth Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-700"
      />

      {/* Cinematic subtle contrast vignette for crystal clear text readability across all sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
};

export default ScrollAnimationBackground;
