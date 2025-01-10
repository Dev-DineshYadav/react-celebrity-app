import { useState, useEffect } from "react";

export const useResponsiveRows = (
  breakpoints = {
    xxxs: { maxWidth: 320, rows: 10 },
    xxs: { minWidth: 321, maxWidth: 380, rows: 9 },
    xs: { minWidth: 381, maxWidth: 420, rows: 8 },
    sm: { minWidth: 421, maxWidth: 639, rows: 6 },
    md: { minWidth: 640, maxWidth: 767, rows: 7 },
    lg: { minWidth: 768, maxWidth: 1023, rows: 6 },
    xl: { minWidth: 1024, maxWidth: 1279, rows: 5 },
    xxl: { minWidth: 1280, maxWidth: 1499, rows: 4 },
    xxxl: { minWidth: 1500, maxWidth: 1899, rows: 3 },
    max: { minWidth: 1900, rows: 2 },
  }
) => {
  const [rows, setRows] = useState(() => {
    if (typeof window === "undefined") return breakpoints.xs.rows;
    const width = window.innerWidth;

    for (const breakpoint of Object.values(breakpoints)) {
      if (breakpoint.maxWidth && breakpoint.minWidth) {
        if (width >= breakpoint.minWidth && width <= breakpoint.maxWidth) {
          return breakpoint.rows;
        }
      } else if (breakpoint.maxWidth) {
        if (width <= breakpoint.maxWidth) {
          return breakpoint.rows;
        }
      } else if (breakpoint.minWidth) {
        if (width >= breakpoint.minWidth) {
          return breakpoint.rows;
        }
      }
    }
    return breakpoints.xs.rows;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      for (const breakpoint of Object.values(breakpoints)) {
        if (breakpoint.maxWidth && breakpoint.minWidth) {
          if (width >= breakpoint.minWidth && width <= breakpoint.maxWidth) {
            setRows(breakpoint.rows);
            return;
          }
        } else if (breakpoint.maxWidth) {
          if (width <= breakpoint.maxWidth) {
            setRows(breakpoint.rows);
            return;
          }
        } else if (breakpoint.minWidth) {
          if (width >= breakpoint.minWidth) {
            setRows(breakpoint.rows);
            return;
          }
        }
      }
      setRows(breakpoints.xs.rows);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints]);

  return rows;
};
