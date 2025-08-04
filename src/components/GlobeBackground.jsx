import { useEffect, useRef } from "react";

export default function GlobeBackground(theme) {
  const vantaRef = useRef(null);

  useEffect(() => {
    let effect = null;

    if (window.VANTA && window.VANTA.NET) {
      effect = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xebe0e4,
        backgroundColor: theme === 'dark' ? 'from-gray-950 via-gray-950 to-gray-950' : 'bg-gray-50',
      });
    }

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="absolute inset-0 z-0 opacity-5" />;
}
