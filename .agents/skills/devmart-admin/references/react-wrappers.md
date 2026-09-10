# React Wrappers

Thin React components around Darkone's vanilla vendor libraries. Prefer these
over re-porting Darkone HTML for any new admin page.

All wrappers use `loadVendor.ts` to lazy-inject the required script/CSS
exactly once per page-load.

## AdminChart — ApexCharts

```tsx
import { AdminChart } from "@/lib/admin";

<AdminChart
  height={320}
  options={{
    chart: { type: "area", toolbar: { show: false } },
    series: [{ name: "Revenue", data: [12, 18, 15, 22, 27, 31] }],
    xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun"] },
  }}
/>;
```

Vendor: bundled inside `vendor.min.js` (already loaded by the layout).

## AdminTable — GridJS

```tsx
<AdminTable
  columns={["Name", "Email", "Status"]}
  data={[["Sally","s@x.com","Active"],["Jacob","j@x.com","Pending"]]}
  search
  pagination={{ limit: 10 }}
/>;
```

Vendor: `/admin/assets/vendor/gridjs/gridjs.umd.js` +
`/admin/assets/vendor/gridjs/theme/mermaid.min.css`.

## AdminDatepicker — Flatpickr

```tsx
<AdminDatepicker
  className="form-control"
  options={{ dateFormat: "Y-m-d", allowInput: true }}
  onChange={(dates) => console.log(dates)}
/>;
```

Vendor: `/admin/assets/vendor/flatpickr/flatpickr.min.js` +
`/admin/assets/vendor/flatpickr/flatpickr.min.css`.

## AdminScroll — SimpleBar

```tsx
<AdminScroll style={{ maxHeight: 320 }}>
  <ul className="list-group">...</ul>
</AdminScroll>;
```

Vendor: bundled in `vendor.min.js`; the wrapper just applies `data-simplebar`.

## Extending

To add a new wrapper (Quill, Dropzone, ...):

1. Follow the `AdminChart.tsx` pattern: `useEffect` calls
   `loadAll([...])`, constructs the vendor instance on a ref, and returns
   a cleanup that destroys it.
2. Export from `src/lib/admin/index.ts`.
3. Keep under ~80 lines.