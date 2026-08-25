import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { DURATION_OPTIONS, SERVICE_OPTIONS, SOUND_OPTIONS, VENUE_OPTIONS } from "@/data/seed";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { createBooking } from "@/services/bookingService";
import type { BookingEnquiry } from "@/types";
import { ActionButton } from "./primitives";

type FormKey = keyof typeof initialForm;
type Errors = Partial<Record<FormKey, string>>;

const initialForm = {
  name: "",
  mobile: "",
  email: "",
  date: "",
  services: [] as string[],
  duration: "",
  guests: "",
  venue: "",
  sound: "",
  location: "",
  message: "",
};

const fieldClass =
  "border border-input bg-[#09090b] px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary";
const labelClass = "text-[11px] font-bold tracking-[0.12em] text-foreground/80 uppercase";

export function BookingForm() {
  const settings = useSiteSettings();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState<BookingEnquiry | null>(null);

  const set = (key: keyof typeof form, value: string | string[]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleService = (service: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(form.mobile.trim())) e.mobile = "Enter a valid mobile number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.date) e.date = "Select your event date.";
    if (form.services.length === 0) e.services = "Select at least one experience.";
    if (!form.duration) e.duration = "Select a duration.";
    if (!form.guests || Number(form.guests) <= 0) e.guests = "Enter expected guests.";
    if (!form.venue) e.venue = "Select a venue type.";
    if (!form.sound) e.sound = "Let me know about sound.";
    if (!form.location.trim()) e.location = "Enter the event location.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const booking = await createBooking({
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        ...(form.email.trim() ? { email: form.email.trim() } : {}),
        date: form.date,
        services: form.services,
        duration: form.duration,
        guests: Number(form.guests),
        venue: form.venue,
        sound: form.sound,
        location: form.location.trim(),
        ...(form.message.trim() ? { message: form.message.trim() } : {}),
      });
      setSaved(booking);
      setForm(initialForm);
    } finally {
      setSubmitting(false);
    }
  }

  if (saved) {
    const waText = encodeURIComponent(
      `${settings.defaultBookingMessage}\n\nReference: ${saved.referenceNumber}\nName: ${saved.name}\nDate: ${saved.date}\nServices: ${saved.services.join(", ")}\nLocation: ${saved.location}`,
    );
    return (
      <div className="card-mm border-t-2 border-t-primary p-8 text-center">
        <CheckCircle2 className="mx-auto text-primary" size={44} />
        <h3 className="mt-4 font-display text-2xl">Enquiry Received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your enquiry has been saved and is now visible in the Maverick Manju enquiry dashboard.
        </p>
        <p className="mt-6 text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          Reference number
        </p>
        <p className="font-display text-3xl text-primary">{saved.referenceNumber}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3.5 text-[12px] font-bold tracking-[0.12em] uppercase transition-all hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
          >
            <MessageCircle size={16} /> Send on WhatsApp
          </a>
          <ActionButton variant="outline" onClick={() => setSaved(null)}>
            Submit another enquiry
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card-mm p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name *" error={errors.name}>
          <input
            className={fieldClass}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your name"
          />
        </Field>
        <Field label="Mobile *" error={errors.mobile}>
          <input
            className={fieldClass}
            value={form.mobile}
            onChange={(e) => set("mobile", e.target.value)}
            placeholder="+91 90000 00000"
            inputMode="tel"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            className={fieldClass}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="email@example.com"
            inputMode="email"
          />
        </Field>
        <Field label="Event Date *" error={errors.date}>
          <input
            type="date"
            className={fieldClass}
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
          />
        </Field>

        <Field label="What are you looking for? *" error={errors.services} full>
          <div className="flex flex-wrap gap-2">
            {SERVICE_OPTIONS.map((service) => {
              const active = form.services.includes(service);
              return (
                <button
                  type="button"
                  key={service}
                  onClick={() => toggleService(service)}
                  aria-pressed={active}
                  className={`border px-3.5 py-2 text-xs transition-colors ${
                    active
                      ? "border-primary bg-primary/15 text-foreground"
                      : "border-input bg-[#09090b] text-muted-foreground hover:border-primary/60"
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Duration *" error={errors.duration}>
          <select
            className={fieldClass}
            value={form.duration}
            onChange={(e) => set("duration", e.target.value)}
          >
            <option value="">Select</option>
            {DURATION_OPTIONS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>
        <Field label="Expected Guests *" error={errors.guests}>
          <input
            type="number"
            min={1}
            className={fieldClass}
            value={form.guests}
            onChange={(e) => set("guests", e.target.value)}
            placeholder="150"
          />
        </Field>
        <Field label="Venue Type *" error={errors.venue}>
          <select
            className={fieldClass}
            value={form.venue}
            onChange={(e) => set("venue", e.target.value)}
          >
            <option value="">Select</option>
            {VENUE_OPTIONS.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </Field>
        <Field label="Speaker + Microphone Available? *" error={errors.sound}>
          <select
            className={fieldClass}
            value={form.sound}
            onChange={(e) => set("sound", e.target.value)}
          >
            <option value="">Select</option>
            {SOUND_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Event Location *" error={errors.location} full>
          <input
            className={fieldClass}
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="Venue name, area, city"
          />
        </Field>
        <Field label="Tell me about your event" full>
          <textarea
            className={`${fieldClass} min-h-28 resize-y`}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Audience, occasion, timing, anything special..."
          />
        </Field>
      </div>

      <ActionButton type="submit" disabled={submitting} className="mt-7 w-full">
        {submitting && <Loader2 size={16} className="animate-spin" />}
        {submitting ? "Sending" : "Send Enquiry"}
      </ActionButton>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Enquiries are stored in this browser (frontend demo storage) and appear in the admin
        dashboard.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string | undefined;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${full ? "sm:col-span-2" : ""}`}>
      <label className={labelClass}>{label}</label>
      {children}
      {error && <span className="text-xs text-primary-glow">{error}</span>}
    </div>
  );
}
