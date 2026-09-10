import { useEffect, useRef } from "react";
import { loadScript, loadStyle } from "./loadVendor";

type FlatpickrOptions = Record<string, unknown>;
type FlatpickrInstance = { destroy: () => void; setDate: (d: unknown, t?: boolean) => void };
declare global {
  interface Window {
    flatpickr?: (el: Element, opts?: FlatpickrOptions) => FlatpickrInstance;
  }
}

export type AdminDatepickerProps = {
  options?: FlatpickrOptions;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
};

/**
 * Flatpickr React wrapper on a Bootstrap `form-control` input. Options
 * pass through to https://flatpickr.js.org/options/.
 */
export function AdminDatepicker({
  options,
  value,
  placeholder,
  className,
  onChange,
}: AdminDatepickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fpRef = useRef<FlatpickrInstance | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadStyle("/admin/assets/vendor/flatpickr/flatpickr.min.css");
      await loadScript("/admin/assets/vendor/flatpickr/flatpickr.min.js");
      if (cancelled || !inputRef.current || !window.flatpickr) return;
      fpRef.current = window.flatpickr(inputRef.current, {
        ...options,
        onChange: (_d: unknown, str: string) => onChange?.(str),
      } as FlatpickrOptions);
    })();
    return () => {
      cancelled = true;
      fpRef.current?.destroy();
      fpRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fpRef.current && value !== undefined) fpRef.current.setDate(value, false);
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="text"
      className={`form-control ${className ?? ""}`.trim()}
      placeholder={placeholder}
      defaultValue={value}
    />
  );
}