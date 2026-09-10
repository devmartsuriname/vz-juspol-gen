import { useEffect, useRef } from "react";
import { loadScript, loadStyle } from "./loadVendor";

/**
 * GridJS React wrapper. Provides sortable / searchable / paginated tables
 * on top of the vendor bundled with Darkone. Column and data shapes match
 * https://gridjs.io/docs/config/columns.
 */
type GridConfig = Record<string, unknown>;
type GridInstance = {
  render: (el: Element) => GridInstance;
  updateConfig: (c: GridConfig) => GridInstance;
  forceRender: () => void;
};
declare global {
  interface Window {
    gridjs?: { Grid: new (c: GridConfig) => GridInstance };
  }
}

export type AdminTableProps = {
  columns: unknown[];
  data: unknown[][] | (() => Promise<unknown[][]>);
  search?: boolean;
  sort?: boolean;
  pagination?: boolean | { limit?: number };
  className?: string;
};

export function AdminTable({
  columns,
  data,
  search = true,
  sort = true,
  pagination = { limit: 10 },
  className,
}: AdminTableProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<GridInstance | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadStyle("/admin/assets/vendor/gridjs/theme/mermaid.min.css");
      await loadScript("/admin/assets/vendor/gridjs/gridjs.umd.js");
      if (cancelled || !hostRef.current || !window.gridjs) return;
      const g = new window.gridjs.Grid({ columns, data, search, sort, pagination });
      gridRef.current = g;
      g.render(hostRef.current);
    })();
    return () => {
      cancelled = true;
      if (hostRef.current) hostRef.current.innerHTML = "";
      gridRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gridRef.current?.updateConfig({ columns, data, search, sort, pagination }).forceRender();
  }, [columns, data, search, sort, pagination]);

  return <div ref={hostRef} className={className} />;
}