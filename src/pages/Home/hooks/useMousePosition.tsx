import { useEffect, useRef, useState } from 'react';

export type MousePosition = Partial<MouseEvent>;

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    offsetX: 0,
    offsetY: 0
  });
  const position = useRef(mousePosition);

  const updateMousePosition = (e: MouseEvent) => {
    const { clientX, clientY, pageX, pageY, offsetX, offsetY } = e;

    position.current = {
      clientX,
      clientY,
      pageX,
      pageY,
      offsetX,
      offsetY
    };
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);

    let animationFrameId: number;

    const animate = () => {
      setMousePosition(position.current);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
