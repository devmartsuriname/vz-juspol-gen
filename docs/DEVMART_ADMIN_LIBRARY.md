# Devmart Admin — React Wrapper Library

Reusable React components that expose the Darkone vendor stack
(ApexCharts, GridJS, Flatpickr, SimpleBar) through a clean React API. Use
these in your own admin pages when you don't want to drop raw Darkone
HTML through `AdminPage`.

All wrappers live under `src/lib/admin/` and are barrel-exported from
`@/lib/admin`. They mount client-side only, dynamically load their vendor
asset from `/admin/assets/vendor/...` on first use (cached across the
session), and clean up on unmount.

> Wrappers assume the admin CSS bundle is already loaded — i.e. they are
> used inside a route under `/admin/*` (the `admin.tsx` layout route
> loads `vendor.min.css`, `icons.min.css`, `style.min.css` and the
> scoped preflight reset). Outside `/admin` they render but are unstyled.

## `AdminChart`

```tsx
import { AdminChart } from "@/lib/admin";

<AdminChart
  height={300}
  options={{
    chart: { type: "area", toolbar: { show: false } },
    series: [{ name: "Revenue", data: [12, 18, 9, 22, 31, 27] }],
    xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun"] },
  }}
/>
```

## `AdminTable`

```tsx
import { AdminTable } from "@/lib/admin";

<AdminTable
  columns={["Name", "Email", "Role"]}
  data={[
    ["Alice", "a@x.com", "Admin"],
    ["Bob",   "b@x.com", "Editor"],
  ]}
  pagination={{ limit: 5 }}
/>
```

`data` may be an array or an async function. `columns`, `search`, `sort`,
`pagination` map 1:1 to [GridJS config](https://gridjs.io/docs/config).

## `AdminDatepicker`

```tsx
import { AdminDatepicker } from "@/lib/admin";

<AdminDatepicker
  placeholder="Pick a date"
  options={{ dateFormat: "Y-m-d" }}
  onChange={(v) => console.log(v)}
/>
```

## `AdminScroll`

```tsx
import { AdminScroll } from "@/lib/admin";

<AdminScroll maxHeight={320}>
  <ul className="list-group">{/* ... */}</ul>
</AdminScroll>
```

## When to use the wrapper vs. `AdminPage`

- **`AdminPage`** — porting a Darkone demo page 1:1 (raw HTML + vendor
  scripts). Layout / scripts come from the template.
- **Wrappers** — building a fresh admin screen for a real product; typed
  React components with clean lifecycle.

Both share the same `/admin/assets/`, so mixing on the same page is safe.