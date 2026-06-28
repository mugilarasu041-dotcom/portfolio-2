import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const colorStops = [
  { r: 10, g: 10, b: 10 },    // #0a0a0a
  { r: 18, g: 10, b: 0 },     // #120a00
  { r: 26, g: 13, b: 0 },     // #1a0d00
  { r: 20, g: 8, b: 0 },      // #140800
  { r: 15, g: 10, b: 5 },     // #0f0a05
];

function interpolateColor(stop1: typeof colorStops[0], stop2: typeof colorStops[0], t: number) {
  return {
    r: Math.round(stop1.r + (stop2.r - stop1.r) * t),
    g: Math.round(stop1.g + (stop2.g - stop1.g) * t),
    b: Math.round(stop1.b + (stop2.b - stop1.b) * t),
  };
}

function getScrollColor(progress: number) {
  const scaled = progress * (colorStops.length - 1);
  const idx = Math.floor(scaled);
  const t = scaled - idx;
  const s1 = colorStops[Math.min(idx, colorStops.length - 1)];
  const s2 = colorStops[Math.min(idx + 1, colorStops.length - 1)];
  return interpolateColor(s1, s2, t);
}

export default function FluidRibbonBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { progress: 0, freqX: 0.02, hue: 0 };

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          obj.progress = self.progress;
          obj.freqX = 0.02 + self.progress * 0.02;
          obj.hue = self.progress * 180;

          const color = getScrollColor(self.progress);
          if (rectRef.current) {
            rectRef.current.setAttribute('fill', `rgb(${color.r}, ${color.g}, ${color.b})`);
          }
          if (turbRef.current) {
            turbRef.current.setAttribute('baseFrequency', `${obj.freqX} ${obj.freqX}`);
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="fluidFilter" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0.02 0.02"
            numOctaves={3}
            result="noise"
          />
          <feColorMatrix
            type="hueRotate"
            values="0"
            in="noise"
            result="coloredNoise"
          />
          <feColorMatrix
            type="saturate"
            values="1.5"
            in="coloredNoise"
          />
        </filter>
      </defs>
      <rect
        ref={rectRef}
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="#0a0a0a"
        filter="url(#fluidFilter)"
      />
    </svg>
  );
}
