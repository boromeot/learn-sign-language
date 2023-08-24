import { useEffect, useRef } from "react";

function useInterval(callback, delay = 10) {
  const savedCallBack = useRef(null);
  
  useEffect(() => {
    savedCallBack.current = callback;
  }, [callback])


  useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [delay])
}

export { useInterval };