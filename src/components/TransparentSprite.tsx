import React, { useEffect, useState } from 'react';

interface TransparentSpriteProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const TransparentSprite: React.FC<TransparentSpriteProps> = ({ src, alt, className, style }) => {
  const [transparentSrc, setTransparentSrc] = useState<string>(src);

  useEffect(() => {
    if (!src) return;

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const w = img.width;
        const h = img.height;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          if (isMounted) setTransparentSrc(src);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // BFS Flood Fill to isolate character from surrounding scenery/background
        const totalPixels = w * h;
        const isBg = new Uint8Array(totalPixels);
        const queue: number[] = [];

        const getPixelColor = (idx: number) => [data[idx * 4], data[idx * 4 + 1], data[idx * 4 + 2], data[idx * 4 + 3]];

        // Top-left and top-right corner reference colors for background seeding
        const tlIdx = 2 + 2 * w;
        const trIdx = (w - 3) + 2 * w;
        const tl = getPixelColor(tlIdx);
        const tr = getPixelColor(trIdx);

        // Helper to check if a border pixel is likely background
        const isLikelyBgSeed = (r: number, g: number, b: number, a: number) => {
          if (a < 50) return true; // Already transparent
          const diffTL = Math.abs(r - tl[0]) + Math.abs(g - tl[1]) + Math.abs(b - tl[2]);
          const diffTR = Math.abs(r - tr[0]) + Math.abs(g - tr[1]) + Math.abs(b - tr[2]);
          return diffTL < 75 || diffTR < 75 || (r > 190 && g > 190 && b > 190);
        };

        // Seed border pixels (top row, left/right columns)
        for (let x = 0; x < w; x++) {
          const idxTop = x; // y = 0
          const [r, g, b, a] = getPixelColor(idxTop);
          if (isLikelyBgSeed(r, g, b, a)) {
            isBg[idxTop] = 1;
            queue.push(idxTop);
          }
        }

        const maxSideY = Math.floor(h * 0.85);
        for (let y = 1; y < maxSideY; y++) {
          // Left border
          const idxLeft = y * w;
          const [rl, gl, bl, al] = getPixelColor(idxLeft);
          if (!isBg[idxLeft] && isLikelyBgSeed(rl, gl, bl, al)) {
            isBg[idxLeft] = 1;
            queue.push(idxLeft);
          }
          // Right border
          const idxRight = y * w + (w - 1);
          const [rr, gr, br, ar] = getPixelColor(idxRight);
          if (!isBg[idxRight] && isLikelyBgSeed(rr, gr, br, ar)) {
            isBg[idxRight] = 1;
            queue.push(idxRight);
          }
        }

        // BFS Flood fill
        let head = 0;
        const colorDiffThreshold = 38; // Max step color delta to traverse background

        while (head < queue.length) {
          const currIdx = queue[head++];
          const cx = currIdx % w;
          const cy = Math.floor(currIdx / w);

          const cr = data[currIdx * 4];
          const cg = data[currIdx * 4 + 1];
          const cb = data[currIdx * 4 + 2];

          // 4-neighborhood
          const neighbors = [
            cy > 0 ? currIdx - w : -1, // top
            cy < maxSideY - 1 ? currIdx + w : -1, // bottom
            cx > 0 ? currIdx - 1 : -1, // left
            cx < w - 1 ? currIdx + 1 : -1, // right
          ];

          for (let i = 0; i < neighbors.length; i++) {
            const nIdx = neighbors[i];
            if (nIdx >= 0 && !isBg[nIdx]) {
              const nr = data[nIdx * 4];
              const ng = data[nIdx * 4 + 1];
              const nb = data[nIdx * 4 + 2];
              const na = data[nIdx * 4 + 3];

              if (na < 30) {
                isBg[nIdx] = 1;
                queue.push(nIdx);
                continue;
              }

              const diff = Math.abs(cr - nr) + Math.abs(cg - ng) + Math.abs(cb - nb);

              if (diff < colorDiffThreshold) {
                isBg[nIdx] = 1;
                queue.push(nIdx);
              }
            }
          }
        }

        // Check if top corners represent a light studio background (white/light canvas)
        const isStudioLightBg = (tl[0] > 180 && tl[1] > 180 && tl[2] > 180) &&
                                (tr[0] > 180 && tr[1] > 180 && tr[2] > 180);

        if (!isStudioLightBg) {
          // Full artwork / complex CG scene (e.g. dark night background) - do not flood fill to preserve clothing
          if (isMounted) setTransparentSrc(src);
          return;
        }

        // Apply alpha transparency for flooded white/light studio background pixels + feathering
        for (let i = 0; i < totalPixels; i++) {
          if (isBg[i]) {
            data[i * 4 + 3] = 0; // Transparent background
          }
        }

        // Edge smoothing / feathering on boundary
        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = y * w + x;
            if (!isBg[idx]) {
              // Check if neighboring pixels are background
              const top = isBg[idx - w];
              const bottom = isBg[idx + w];
              const left = isBg[idx - 1];
              const right = isBg[idx + 1];

              const bgNeighborCount = top + bottom + left + right;
              if (bgNeighborCount >= 2) {
                // Soft edge blend
                data[idx * 4 + 3] = Math.min(data[idx * 4 + 3], 160);
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const resultUrl = canvas.toDataURL('image/png');
        if (isMounted) {
          setTransparentSrc(resultUrl);
        }
      } catch (err) {
        if (isMounted) setTransparentSrc(src);
      }
    };

    img.onerror = () => {
      if (isMounted) setTransparentSrc(src);
    };

    img.src = src;

    return () => {
      isMounted = false;
    };
  }, [src]);

  const isRawFullArtwork = transparentSrc === src;

  const maskStyle = isRawFullArtwork
    ? {
        WebkitMaskImage: 'radial-gradient(ellipse 94% 88% at 50% 45%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.85) 86%, rgba(0,0,0,0) 100%)',
        maskImage: 'radial-gradient(ellipse 94% 88% at 50% 45%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.85) 86%, rgba(0,0,0,0) 100%)',
      }
    : {
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
      };

  return (
    <img
      src={transparentSrc}
      alt={alt || 'Character Standee'}
      className={className}
      style={{
        ...style,
        ...maskStyle,
      }}
    />
  );
};

