import { useEffect, useRef } from "react";
import { loadScript } from "./loadVendor";

/**
 * ApexCharts React wrapper. Ships zero raw HTML — the chart is rendered
 * into a plain <div> that we own. Options mirror the ApexCharts config
 * object (https://apexcharts.com/docs/options/).
 */
type ApexOptions = Record<string, unknown>;
type ApexInstance = {
  render: () => Promise<void>;
  updateOptions: (o: ApexOptions, r?: boolean, a?: boolean) => Promise<void>;
  destroy: () => void;
};
declare global {
  interface Window {
    ApexCharts?: new (el: Element, opts: ApexOptions) => ApexInstance;
  }
}

export type AdminChartProps = {
  options: ApexOptions;
  height?: number | string;
  className?: string;
};

export function AdminChart({ options, height, className }: AdminChartProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ApexInstance | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadScript("/admin/assets/vendor/apexcharts/apexcharts.min.js");
      if (cancelled || !hostRef.current || !window.ApexCharts) return;
      const merged: ApexOptions = height
        ? { ...options, chart: { ...(options.chart as object), height } }
        : options;
      const c = new window.ApexCharts(hostRef.current, merged);
      chartRef.current = c;
      c.render();
    })();
    return () => {
      cancelled = true;
      chartRef.current?.destroy();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chartRef.current) chartRef.current.updateOptions(options, false, true);
  }, [options]);

  return <div ref={hostRef} className={className} />;
}