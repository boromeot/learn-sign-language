import { useEffect, useRef } from "react";

function useInterval(callback, delay = 10) {
  const savedCallBack = useRef();
  
  useEffect(() => {
    savedCallBack.current = callback;
  }, [callback])


  useEffect(() => {
    const id = setInterval(() => savedCallBack.current(), delay);
    return () => clearInterval(id);
  }, [delay])
}

export { useInterval };