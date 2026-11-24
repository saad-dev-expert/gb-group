import { track, initAnalytics } from "./analytics";
import { site } from "../config/site";

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* Mobile navigation                                                    */
/* ------------------------------------------------------------------ */
function initMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (!toggle || !menu) return;

  const close = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const open = !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      close();
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      menu.classList.contains("is-open") &&
      !menu.contains(event.target as Node) &&
      !toggle.contains(event.target as Node)
    ) {
      close();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 899) close();
  });
}

/* ------------------------------------------------------------------ */
/* Scroll reveal + back to top                                          */
/* ------------------------------------------------------------------ */
function initScrollUI(): void {
  const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (REDUCED_MOTION || !("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.08 }
    );
    revealItems.forEach((el) => observer.observe(el));
  }

  const topButton = document.querySelector<HTMLButtonElement>("[data-back-to-top]");
  if (topButton) {
    const update = () => topButton.classList.toggle("is-visible", window.scrollY > 700);
    window.addEventListener("scroll", update, { passive: true });
    update();
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: REDUCED_MOTION ? "auto" : "smooth" });
    });
  }
}

/* ------------------------------------------------------------------ */
/* Property filters                                                     */
/* ------------------------------------------------------------------ */
function initFilters(): void {
  const root = document.querySelector<HTMLElement>("[data-property-filters]");
  if (!root) return;

  const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-property-card]"));
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-filter-value]"));
  const selected: Record<string, string> = {};
  const count = document.querySelector<HTMLElement>("[data-filter-count]");

  const apply = () => {
    let visible = 0;
    cards.forEach((card) => {
      const show = Object.entries(selected).every(
        ([group, value]) => !value || card.dataset[group] === value
      );
      card.hidden = !show;
      if (show) visible++;
    });
    buttons.forEach((button) => {
      const group = button.dataset.filterGroup || "";
      button.setAttribute("aria-pressed", String(selected[group] === button.dataset.filterValue));
    });
    if (count) count.textContent = String(visible);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.dataset.filterGroup || "";
      const value = button.dataset.filterValue || "";
      selected[group] = selected[group] === value ? "" : value;
      apply();
      track("property_filter", { group, value });
    });
  });

  apply();
}

/* ------------------------------------------------------------------ */
/* Enquiry forms                                                        */
/* ------------------------------------------------------------------ */
function initEnquiryForms(): void {
  const forms = Array.from(document.querySelectorAll<HTMLFormElement>("[data-enquiry-form]"));

  forms.forEach((form) => {
    const panel = form.closest<HTMLElement>("[data-enquiry-panel]");
    const success = panel?.querySelector<HTMLElement>("[data-form-success]");
    const status = panel?.querySelector<HTMLElement>("[data-form-status]");
    const waOpen = panel?.querySelector<HTMLAnchorElement>("[data-wa-open]");
    const emailOpen = Array.from(
      panel?.querySelectorAll<HTMLAnchorElement>("[data-email-open]") ?? []
    );
    const reset = panel?.querySelector<HTMLButtonElement>("[data-form-reset]");
    const endpoint = form.dataset.endpoint || "";

    const field = (name: string) =>
      form.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        `[name="${name}"]`
      );

    const setError = (name: string, message: string) => {
      const input = field(name);
      const error = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
      if (input) input.setAttribute("aria-invalid", "true");
      if (error) {
        error.textContent = message;
        error.hidden = false;
      }
    };

    const clearErrors = () => {
      form.querySelectorAll<HTMLElement>("[data-error-for]").forEach((el) => {
        el.hidden = true;
        el.textContent = "";
      });
      form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
    };

    const normalisePhone = (raw: string) => {
      let digits = raw.replace(/\D/g, "");
      if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
      return digits;
    };

    const values = () => ({
      name: field("name")?.value.trim() || "",
      phone: normalisePhone(field("phone")?.value || ""),
      email: field("email")?.value.trim() || "",
      service: field("service")?.value.trim() || form.dataset.service || "General enquiry",
      message: field("message")?.value.trim() || "",
      consent: (field("consent") as HTMLInputElement | undefined)?.checked || false,
    });

    const validate = () => {
      clearErrors();
      const data = values();
      let firstInvalid: HTMLElement | null = null;

      if (data.name.length < 2) {
        setError("name", "Please enter your full name.");
        firstInvalid = firstInvalid || field("name") || null;
      }
      if (!/^[6-9]\d{9}$/.test(data.phone)) {
        setError("phone", "Enter a valid 10-digit Indian mobile number.");
        firstInvalid = firstInvalid || field("phone") || null;
      }
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        setError("email", "Enter a valid email address or leave this blank.");
        firstInvalid = firstInvalid || field("email") || null;
      }
      if (!data.consent) {
        setError("consent", "Please agree to be contacted about your enquiry.");
        firstInvalid = firstInvalid || field("consent") || null;
      }

      if (firstInvalid) firstInvalid.focus();
      return firstInvalid ? null : data;
    };

    const buildMessage = (data: ReturnType<typeof values>) =>
      `Hello ${site.brand}, I am ${data.name}.\nMobile: ${data.phone}\nService: ${data.service}\n${
        data.email ? `Email: ${data.email}\n` : ""
      }Requirement: ${data.message || "Please contact me with more information."}`;

    const showSuccess = (message: string) => {
      if (status) {
        status.hidden = false;
        status.textContent = message;
      }
      form.hidden = true;
      if (success) success.hidden = false;
      track("enquiry_success", { source: form.dataset.source || "website" });
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = validate();
      if (!data) {
        track("enquiry_validation_error", { source: form.dataset.source || "website" });
        return;
      }

      track("enquiry_submit", { source: form.dataset.source || "website", service: data.service });
      const text = buildMessage(data);
      const waUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
      if (waOpen) waOpen.href = waUrl;
      {
        const subject = encodeURIComponent(`Enquiry — ${data.service} — ${data.name}`);
        const body = encodeURIComponent(text);
        emailOpen.forEach((anchor) => {
          anchor.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        });
      }

      if (endpoint) {
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...data,
              source: form.dataset.source || "website",
              submittedAt: new Date().toISOString(),
            }),
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          showSuccess("Thank you — your enquiry has been received. Our team will contact you shortly.");
          return;
        } catch {
          if (waOpen) waOpen.click();
          showSuccess(
            "Your enquiry could not be saved online, so WhatsApp is opening with your details. If it does not open, tap the WhatsApp button below."
          );
          return;
        }
      }

      if (waOpen) waOpen.click();
      showSuccess(
        "WhatsApp is opening with your details. If it does not open automatically, use the button below."
      );
    });

    reset?.addEventListener("click", () => {
      form.reset();
      clearErrors();
      form.hidden = false;
      if (success) success.hidden = true;
      if (status) {
        status.hidden = true;
        status.textContent = "";
      }
      field("name")?.focus();
    });
  });
}

/* ------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initScrollUI();
  initFilters();
  initEnquiryForms();
  initAnalytics();
});
