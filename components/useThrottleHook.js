import { useState, useEffect } from "react";
export default function useThrottole(value, delay) {
  const [throttle, setThrottle] = useState(value);

  useEffect(()=>{
    const handler = setTimeout(()=>{
        setThrottle(value);
    },delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return throttle;
}
