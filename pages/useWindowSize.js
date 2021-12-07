import React from "react";

export default function useWindowSize() {
  const isSSR = typeof global.window !== "undefined";
  const [windowSize, setWindowSize] = React.useState({
    width: isSSR ? 1200 : global.innerWidth,
    height: isSSR ? 800 : global.innerHeight,
  });

  function changeWindowSize() {
    setWindowSize({ width: global.window.innerWidth, height: global.window.innerHeight });
  }

  React.useEffect(() => {
    global.window.addEventListener("resize", changeWindowSize);

    return () => {
      global.window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}