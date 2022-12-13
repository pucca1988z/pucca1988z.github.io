import { useCallback, useState } from "react";

export default function useCenteredTree(defaultTranslate = { x: 0, y: 0 }){
  const [translate, setTranslate] = useState(defaultTranslate);
  const [dimensions, setDimensions] = useState();
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      setDimensions({ width:containerElem.offsetWidth, height:containerElem.offsetHeight });
      setTranslate({ x: containerElem.offsetWidth/2, y: containerElem.offsetHeight/2 });
    }
  }, []);
  return [dimensions, translate, containerRef];
};