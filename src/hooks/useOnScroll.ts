import { useEffect } from "react";

const useOnScroll = (callback?: (offsetVertical: number) => void) => {
  const onScroll = () => {
    if (callback) {
      callback(window.pageYOffset);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
};

export default useOnScroll;
