import heroStage from "@/assets/hero-stage.jpg";
import walkAround from "@/assets/walk-around.jpg";
import mentalism from "@/assets/mentalism.jpg";
import emcee from "@/assets/emcee.jpg";
import type {
  EventType,
  GalleryItem,
  ServiceType,
  SiteSettings,
  Testimonial,
} from "@/types";

export const IMAGES = { heroStage, walkAround, mentalism, emcee };

/** Public demo video (royalty free sample) used only so video rendering is visible on first load. */
const DEMO_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

const now = Date.now();
const daysAgo = (d: number) => new Date(now - d * 86400000).toISOString();

/**
 * SEED / DEMO DATA
 * Written into browser storage the first time the app runs. After that the
 * stored (admin-managed) data always wins — nothing here is rendered directly.
 */
export const seedGallery: GalleryItem[] = [
  {
    id: "seed-1",
    type: "image",
    title: "Annual Day Stage Show",
    description: "Closing act for a 900-guest corporate annual day.",
    mediaUrl: heroStage,
    category: "Stage Magic",
    featured: true,
    status: "published",
    layout: "large",
    sortOrder: 1,
    createdAt: daysAgo(30),
  },
  {
    id: "seed-2",
    type: "image",
    title: "Table-to-Table Close-Up",
    description: "Sunday brunch walk-around magic at a five star hotel.",
    mediaUrl: walkAround,
    category: "Hotel",
    featured: true,
    status: "published",
    layout: "tall",
    sortOrder: 2,
    createdAt: daysAgo(26),
  },
  {
    id: "seed-3",
    type: "image",
    title: "The Prediction",
    description: "A sealed envelope, written three hours before the show.",
    mediaUrl: mentalism,
    category: "Mentalism",
    featured: false,
    status: "published",
    layout: "medium",
    sortOrder: 3,
    createdAt: daysAgo(20),
  },
  {
    id: "seed-4",
    type: "image",
    title: "Owning The Room",
    description: "Hosting, games and crowd interaction at a dealer meet.",
    mediaUrl: emcee,
    category: "Emcee",
    featured: false,
    status: "published",
    layout: "wide",
    sortOrder: 4,
    createdAt: daysAgo(14),
  },
  {
    id: "seed-5",
    type: "video",
    title: "Show Reel — Live Reactions",
    description: "A short cut of audience reactions from recent shows.",
    mediaUrl: DEMO_VIDEO,
    thumbnailUrl: heroStage,
    category: "Corporate",
    featured: true,
    status: "published",
    layout: "medium",
    sortOrder: 5,
    createdAt: daysAgo(9),
  },
  {
    id: "seed-6",
    type: "image",
    title: "Clubhouse Family Evening",
    description: "All-age entertainment: kids, parents and grandparents.",
    mediaUrl: walkAround,
    category: "Clubhouse",
    featured: false,
    status: "published",
    layout: "small",
    sortOrder: 6,
    createdAt: daysAgo(5),
  },
];

export const seedTestimonials: Testimonial[] = [
  {
    id: "t-1",
    clientName: "Ramya Krishnan",
    company: "Zeta Technologies",
    role: "HR Lead",
    eventType: "Corporate Annual Day",
    rating: 5,
    text: "Manju hosted and performed — which meant one point of coordination instead of three vendors. The mentalism segment had 900 people completely silent, then screaming.",
    featured: true,
    status: "published",
    sortOrder: 1,
    createdAt: daysAgo(40),
  },
  {
    id: "t-2",
    clientName: "Arjun Menon",
    company: "Prestige Clubhouse",
    role: "Events Committee",
    eventType: "Clubhouse Family Night",
    rating: 5,
    text: "Kids, parents and seniors were all involved. The walk-around magic before dinner set the tone and the games kept the energy going till the end.",
    featured: false,
    status: "published",
    sortOrder: 2,
    createdAt: daysAgo(28),
  },
  {
    id: "t-3",
    clientName: "Sneha & Vikram",
    eventType: "Wedding Reception",
    rating: 5,
    text: "Our guests were entertained during the waiting time between the ceremony and dinner — something we never planned for. Guests still talk about the card trick at their table.",
    featured: false,
    status: "published",
    sortOrder: 3,
    createdAt: daysAgo(12),
  },
];

export const services: ServiceType[] = [
  {
    slug: "stage-magic",
    title: "Stage Magic",
    shortDescription: "High-energy magic and mentalism designed for the whole audience.",
    fullDescription:
      "A professional stage experience combining magic, comedy, audience participation and mentalism. Built for corporate stages, annual days, award nights, conferences, clubhouses and weddings — scaled to your run-of-show.",
    highlights: [
      "Stage magic",
      "Mentalism",
      "Audience participation",
      "Interactive comedy",
      "Customized segments",
      "Corporate friendly",
    ],
    imageUrl: heroStage,
    page: "/stage-magic",
    ctaLabel: "Book Stage Magic",
  },
  {
    slug: "walk-around-magic",
    title: "Walk-Around Magic",
    shortDescription: "Close-up magic that comes directly to your guests.",
    fullDescription:
      "Magic doesn't always need a stage. Table-to-table and group-to-group close-up magic for star-hotel brunches, networking events, receptions, private parties and clubhouse gatherings.",
    highlights: [
      "Close-up magic",
      "Table-to-table",
      "Networking entertainment",
      "Brunch experiences",
      "Mentalism moments",
      "Guest interaction",
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
    title: "Emcee & Interactive Entertainment",
    shortDescription: "Games, interaction and energy that get people involved.",
    fullDescription:
      "Don't just host the event — own the energy. Ice breakers, magic-based games, family activities and professional hosting, customized to the age group, venue and event format.",
    highlights: [
      "Professional hosting",
      "Ice breakers",
      "Magic-based games",
      "Birthday games",
      "Corporate engagement",
      "Crowd interaction",
    ],
    imageUrl: emcee,
    page: "/emcee",
    ctaLabel: "Plan My Event",
  },
  {
    slug: "magic-emcee",
    title: "Magic + Emcee",
    shortDescription: "One professional, the full entertainment arc of your event.",
    fullDescription:
      "Start with walk-around magic, move into games and audience engagement, host the event and finish with stage magic or mentalism. One booking, one coordination point, one seamless flow.",
    highlights: [
      "Complete event flow",
      "Single coordination point",
      "Cost efficient",
      "Custom run-of-show",
      "Stage + floor",
      "Full-length events",
    ],
    imageUrl: heroStage,
    ctaLabel: "Book The Combination",
  },
  {
    slug: "corporate",
    title: "Corporate Entertainment",
    shortDescription: "Annual days, award nights, conferences and dealer meets.",
    fullDescription:
      "Entertainment built for a corporate run-of-show: clean content, brand-safe humour, tight timing and segments that can carry a product or award reveal.",
    highlights: [
      "Annual days",
      "Award nights",
      "Conferences",
      "Dealer meets",
      "Brand reveals",
      "Employee engagement",
    ],
    imageUrl: emcee,
    ctaLabel: "Enquire For Corporate",
  },
  {
    slug: "birthday",
    title: "Birthday Entertainment",
    shortDescription: "Magic, games and hosting for a birthday people remember.",
    fullDescription:
      "Age-appropriate magic, participation games and hosting for children's parties, milestone birthdays and family celebrations at homes, clubhouses and party halls.",
    highlights: [
      "Kids & family shows",
      "Milestone birthdays",
      "Participation games",
      "Party hall or home",
      "Photo moments",
      "Flexible duration",
    ],
    imageUrl: walkAround,
    ctaLabel: "Book For A Birthday",
  },
  {
    slug: "wedding",
    title: "Wedding Entertainment",
    shortDescription: "Guest entertainment between ceremonies, meals and celebrations.",
    fullDescription:
      "Weddings have waiting time. Walk-around magic and interactive moments keep guests engaged during receptions, cocktail hours and gaps in the schedule.",
    highlights: [
      "Reception entertainment",
      "Cocktail hour magic",
      "Family interaction",
      "Sangeet & mehendi",
      "Photo-friendly moments",
      "Discreet & elegant",
    ],
    imageUrl: mentalism,
    ctaLabel: "Enquire For Weddings",
  },
  {
    slug: "hotel",
    title: "Hotel / Brunch Entertainment",
    shortDescription: "Sunday brunch and lounge experiences for luxury venues.",
    fullDescription:
      "A recurring guest experience for star hotels: close-up magic moving through the restaurant, giving guests a reason to stay longer and return.",
    highlights: [
      "Sunday brunches",
      "Lounge & bar",
      "Guest experience",
      "Repeat engagements",
      "Family friendly",
      "Elegant close-up",
    ],
    imageUrl: walkAround,
    ctaLabel: "Enquire For Hotels",
  },
  {
    slug: "clubhouse",
    title: "Clubhouse Entertainment",
    shortDescription: "All-age entertainment for community and residential events.",
    fullDescription:
      "Community events have the toughest audience mix — children, parents and seniors together. This format is designed to bring all of them into the same experience.",
    highlights: [
      "Festival events",
      "Community days",
      "All-age content",
      "Games & hosting",
      "Outdoor or indoor",
      "Large families",
    ],
    imageUrl: emcee,
    ctaLabel: "Enquire For Clubhouse",
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
