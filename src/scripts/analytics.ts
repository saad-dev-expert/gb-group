type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/** Fire a GA4 event when analytics has been configured. Safe no-op otherwise. */
export function track(event: string, params: Record<string, unknown> = {}): void {
  const w = window as GtagWindow;
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params);
  }
}

/**
 * Delegated tracking for every call, WhatsApp and email link marked with
 * data-track="call|whatsapp|email|service_view".
 */
export function initAnalytics(): void {
  document.addEventListener("click", (event) => {
    const el = (event.target as HTMLElement)?.closest<HTMLElement>("[data-track]");
    if (!el) return;

    const kind = el.dataset.track || "link";
    const label = el.dataset.trackLabel || el.textContent?.trim().slice(0, 60) || "";
    track(`contact_${kind}`, { link_label: label, page_path: location.pathname });
  });
}
