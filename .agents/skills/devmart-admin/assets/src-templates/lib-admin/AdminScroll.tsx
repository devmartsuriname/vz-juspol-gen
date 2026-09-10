import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { loadScript, loadStyle } from "./loadVendor";

type SimpleBarInstance = { unMount: () => void };
declare global {
  interface Window {
    SimpleBar?: new (el: Element, opts?: Record<string, unknown>) => SimpleBarInstance;
  }
}

export type AdminScrollProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxHeight?: number | string;
};

/**
 * SimpleBar React wrapper. Wraps children in a scroll container with the
 * same custom scrollbars used by the Darkone sidebar / dropdowns.
 */
export function AdminScroll({ children, className, style, maxHeight }: AdminScrollProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const sbRef = useRef<SimpleBarInstance | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadStyle("/admin/assets/vendor/simplebar/simplebar.min.css");
      await loadScript("/admin/assets/vendor/simplebar/simplebar.min.js");
      if (cancelled || !hostRef.current || !window.SimpleBar) return;
      sbRef.current = new window.SimpleBar(hostRef.current);
    })();
    return () => {
      cancelled = true;
      sbRef.current?.unMount();
      sbRef.current = null;
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ ...(maxHeight !== undefined ? { maxHeight } : null), ...style }}
    >
      {children}
    </div>
  );
}