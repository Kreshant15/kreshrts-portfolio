// ProjectRouter.tsx
// Drop this into your router config instead of directly using ProjectDetailPage

import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

// ─── Register custom project pages here ───────────────────
// Only add projects that have a dedicated .tsx page.
// All others automatically fall back to the generic template.

const customProjectPages: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  "driphive": lazy(() =>
    import("./projects/DripHiveProject").then((m) => ({ default: m.DripHiveProject })),
  ),
  "vexels": lazy(() =>
    import("./projects/VexelsProject").then((m) => ({ default: m.VexelsProject })),
  ),
  "aura-app": lazy(() =>
    import("./projects/AuraProject").then((m) => ({ default: m.AuraProject })),
  ),
  // Add new custom pages here as you build them:
  // "vitl":     lazy(() => import("../projects/VITLProject").then(m => ({ default: m.VITLProject }))),
};

// ─── Loading fallback (minimal, matches dark theme) ───────
const PageLoader = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: "#0a0a0a" }}
  >
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: "#7c3aed", borderTopColor: "transparent" }}
      />
      <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-500">
        Loading
      </p>
    </div>
  </div>
);

// ─── The router component ──────────────────────────────────
export const ProjectRouter = () => {
  const { id } = useParams<{ id: string }>();
  const CustomPage = id ? customProjectPages[id] : undefined;

  if (!CustomPage) {
    // No custom page registered → use the generic template
    return <ProjectDetailPage />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <CustomPage />
    </Suspense>
  );
};
