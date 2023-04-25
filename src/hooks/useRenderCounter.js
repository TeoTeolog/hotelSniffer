import { useEffect, useRef } from "react";

export function useRenderCounter(componentName) {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
    console.log(`${componentName} rendered ${renderCount.current} times.`);
  });

  return renderCount.current;
}
