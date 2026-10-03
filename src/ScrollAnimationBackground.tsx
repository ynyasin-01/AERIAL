import React, { useEffect, useRef } from 'react';

const ScrollAnimationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCount = 300;

  // Frame URL resolver
  const getFrameUrl = (index: number) =>
    `/assets/ezgif/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

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
    let isInitialDrawn = false;
    let animationFrameId: number;
    let isUnmounted = false;

    // Cover-fit image on canvas maintaining 16:9 aspect ratio and sharpness
    const drawImageCover = (img: HTMLImageElement) => {
      if (!img || !img.complete || !img.naturalWidth || !ctx) return;

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

      return images[1] || null;
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

    // Preload frames with instant first frame
    const initPreload = () => {
      // Priority 1: First frame
      const firstImg = new Image();
      firstImg.onload = () => {
        if (isUnmounted) return;
        isLoaded[1] = 1;
        if (!isInitialDrawn) {
          drawImageCover(firstImg);
          isInitialDrawn = true;
          renderedFrame = 1;
        }
      };
      firstImg.src = getFrameUrl(1);
      images[1] = firstImg;

      if (firstImg.complete) {
        isLoaded[1] = 1;
        drawImageCover(firstImg);
        isInitialDrawn = true;
        renderedFrame = 1;
      }

      // Priority 2: Preload subsequent frames in chunks with decode()
      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        img.onload = () => {
          if (isUnmounted) return;
          isLoaded[i] = 1;
          if (img.decode) {
            img.decode().catch(() => {});
          }
        };
        img.src = getFrameUrl(i);
        images[i] = img;
      }
    };

    // Calculate normalized scroll progress (0 to 1)
    const updateTargetProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));
    };

    // Physics-damped animation loop (60/120Hz smooth lerp)
    const tick = () => {
      if (isUnmounted) return;

      // 0.08 damping factor gives fluid, luxurious momentum
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
        if (img) {
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
      {/* High-DPI Smooth Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-85 transition-opacity duration-700"
      />

      {/* Cinematic subtle contrast vignette for crystal clear text readability across all sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
};

export default ScrollAnimationBackground;
