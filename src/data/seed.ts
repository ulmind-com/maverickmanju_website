const heroStage = "/images/hero-stage.jpg";
const walkAround = "/images/walk-around.jpg";
const mentalism = "/images/mentalism.jpg";
const emcee = "/images/emcee.jpg";
import type { EventType, ServiceType, SiteSettings } from "@/types";

export const IMAGES = { heroStage, walkAround, mentalism, emcee };

/**
 * Static copy for the four core performances. Only `imageUrl` is admin managed —
 * read these through `useServices()` so the Cloudinary image is merged in.
 */
export const services: ServiceType[] = [
  {
    slug: "stage-magic",
    title: "Stage Magic",
    shortDescription: "A stage full of wonder. An audience full of reactions.",
    fullDescription:
      "A professional stage experience combining magic, comedy, audience participation and mentalism. Designed for corporate events, annual days, award nights, conferences, clubhouses, weddings and celebrations.",
    highlights: [
      "Stage Magic",
      "Audience Participation",
      "Interactive Comedy",
      "Corporate Entertainment",
      "Customized Segments",
    ],
    imageUrl: heroStage,
    page: "/stage-magic",
    ctaLabel: "Book Stage Magic",
  },
  {
    slug: "walk-around-magic",
    title: "Walk-Around Magic",
    shortDescription: "Magic doesn't always need a stage.",
    fullDescription:
      "Sometimes the magician comes to you. Walk-around magic is ideal for star-hotel brunches, networking events, weddings, receptions, private parties and clubhouse gatherings.",
    highlights: [
      "Close-Up Magic",
      "Table-to-Table Magic",
      "Networking Entertainment",
      "Brunch Experiences",
      "Mentalism",
      "Guest Interaction",
    ],
    imageUrl: walkAround,
    page: "/walk-around-magic",
    ctaLabel: "Book Walk-Around",
  },
  {
    slug: "mentalism",
    title: "Mentalism",
    shortDescription: "Predictions, influence and mystery that feel impossible.",
    fullDescription:
      "A layer of curiosity that stays with the audience long after the event. Predictions, thought reading and impossible reveals delivered with restraint and theatre — never gimmicky.",
    highlights: [
      "Predictions",
      "Thought reading",
      "Sealed envelope reveals",
      "Executive audiences",
      "Intimate or large rooms",
      "Custom brand reveals",
    ],
    imageUrl: mentalism,
    page: "/mentalism",
    ctaLabel: "Book Mentalism",
  },
  {
    slug: "emcee",
    title: "Emcee [ Games ] & Interactive Entertainment",
    shortDescription: "Games, interaction and energy that get people involved.",
    fullDescription:
      "Don't just host the event — own the energy. Ice breakers, magic-based games, family activities and professional hosting, customized to the age group, venue and event format.",
    highlights: [
      "Professional hosting",
      "Ice breakers",
      "Interactive games",
      "Birthday games",
      "Corporate engagement",
      "Crowd interaction",
    ],
    imageUrl: emcee,
    page: "/emcee",
    ctaLabel: "Plan My Event",
  },
];

export const eventTypes: EventType[] = [
  {
    id: "corporate",
    title: "Corporate",
    icon: "Building2",
    description:
      "Annual days, conferences, award nights, employee engagement, dealer meets and celebrations.",
  },
  {
    id: "birthdays",
    title: "Birthdays",
    icon: "Cake",
    description:
      "Magic, games, mentalism and Emcee activities for memorable birthday entertainment.",
  },
  {
    id: "hotels",
    title: "Star Hotels",
    icon: "Hotel",
    description:
      "Walk-around magic and mentalism designed for brunches, networking and guest experiences.",
  },
  {
    id: "clubhouses",
    title: "Clubhouses",
    icon: "Home",
    description:
      "All-age entertainment that brings children, parents and seniors into the experience.",
  },
  {
    id: "weddings",
    title: "Weddings",
    icon: "Heart",
    description: "Interactive guest entertainment between ceremonies, meals and celebrations.",
  },
  {
    id: "private",
    title: "Private Events",
    icon: "Sparkles",
    description: "Customized entertainment built around your audience, venue and occasion.",
  },
];

/** Fallbacks used until /api/settings responds, and to fill keys a stored document predates. */
export const defaultSettings: SiteSettings = {
  artistName: "Maverick Manju",
  tagline: "Magician | Emcee | Mentalist | Creator Coach",
  phone: "+91 98860 00000",
  whatsapp: "919886000000",
  email: "bookings@maverickmanju.in",
  instagram: "https://instagram.com/maverickmanju",
  facebook: "https://facebook.com/maverickmanju",
  youtube: "https://youtube.com/@maverickmanju",
  website: "maverickmanju.in",
  defaultBookingMessage:
    "Hi Maverick Manju, I would like to enquire about magic entertainment for my event.",
  footerCopyright: "© 2026 Maverick Manju. All Rights Reserved.",
  googleReviewLink: "https://g.page/maverickmanju/review",
  heroImageUrl: "/images/hero-manju-magic.jpg",
  heroImagePublicId: "",
};

export const SERVICE_OPTIONS = [
  "Stage Performance",
  "Walk-Around Magic",
  "Emcee Activities",
  "Magic + Emcee",
  "Mentalism",
];

export const DURATION_OPTIONS = ["30 Minutes", "60 Minutes", "90 Minutes", "2 Hours", "Other"];

export const VENUE_OPTIONS = [
  "Clubhouse",
  "Party Hall",
  "Corporate House / Office",
  "Star Hotel",
  "Restaurant / Brunch Venue",
  "Wedding Venue",
  "Outdoor Venue",
  "Other",
];

export const SOUND_OPTIONS = ["Yes", "No", "Not Sure"];
