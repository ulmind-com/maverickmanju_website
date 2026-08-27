/**
 * SeoSchemas — JSON-LD structured data components for SEO.
 *
 * Renders invisible <script type="application/ld+json"> blocks that Google,
 * Bing and social crawlers parse for rich snippets, Knowledge Panels and
 * breadcrumb trails.
 */

/* ------------------------------------------------------------------ */
/*  Shared Types                                                      */
/* ------------------------------------------------------------------ */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ServiceSchemaProps {
  serviceType: string;
  description: string;
  url: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

/* ------------------------------------------------------------------ */
/*  Person + LocalBusiness + WebSite (global — render once in root)    */
/* ------------------------------------------------------------------ */

const SITE_URL = "https://www.maverickmanju.in";
const HERO_IMAGE = `${SITE_URL}/images/hero-manju-magic.jpg`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Maverick Manju",
  alternateName: [
    "Mevrick Manju",
    "Mevrick",
    "Maverick",
    "Manju magician",
    "Maverick magician",
    "Maverick Manju magician",
    "Maverick Manju emcee",
    "Maverick Manju mentalist",
    "Maverick Manju Bangalore",
    "Maverick Manju Bengaluru",
  ],
  url: SITE_URL,
  image: HERO_IMAGE,
  description:
    "Maverick Manju is the best magician in Bangalore and Bengaluru. Professional magician for hire, top emcee and best mentalist offering stage magic show, walk-around magic, close-up magic, mentalism show and interactive emcee entertainment for corporate events, weddings, birthday parties and private celebrations across India.",
  jobTitle: "Professional Magician, Emcee & Mentalist",
  worksFor: {
    "@type": "Organization",
    name: "Maverick Manju Entertainment",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Stage Magic",
    "Close-up Magic",
    "Walk-Around Magic",
    "Mentalism",
    "Mind Reading",
    "Emcee",
    "Event Hosting",
    "Corporate Entertainment",
  ],
  sameAs: [
    "https://instagram.com/maverickmanju",
    "https://facebook.com/maverickmanju",
    "https://youtube.com/@maverickmanju",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Maverick Manju — Magician, Emcee & Mentalist",
  image: HERO_IMAGE,
  url: SITE_URL,
  telephone: "+919886000000",
  email: "bookings@maverickmanju.in",
  description:
    "Maverick Manju is the best magician in Bangalore and Bengaluru. Professional magician for hire offering stage magic show, walk-around magic, close-up magic, mentalism show and best emcee services. Top magician and professional emcee for corporate events, weddings, birthday parties, college events, school events, annual functions and private celebrations. Best event host and anchor in Bangalore.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "12.9716",
    longitude: "77.5946",
  },
  areaServed: [
    { "@type": "City", name: "Bangalore" },
    { "@type": "City", name: "Mysore" },
    { "@type": "City", name: "Chennai" },
    { "@type": "City", name: "Hyderabad" },
    { "@type": "State", name: "Karnataka" },
    { "@type": "Country", name: "India" },
  ],
  priceRange: "₹₹₹",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "21:00",
  },
  sameAs: [
    "https://instagram.com/maverickmanju",
    "https://facebook.com/maverickmanju",
    "https://youtube.com/@maverickmanju",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Maverick Manju",
  alternateName: [
    "Mevrick Manju",
    "Mevrick",
    "Maverick Manju Magician",
    "Maverick Manju Emcee",
    "Maverick Manju Mentalist",
    "Maverick Manju Entertainment",
    "Maverick Manju Bangalore",
    "Maverick Manju Bengaluru",
    "Manju magician",
    "Maverick magician",
  ],
  url: SITE_URL,
  publisher: {
    "@type": "Person",
    name: "Maverick Manju",
  },
};

/** Renders all global schemas — call once from the root layout. */
export function GlobalSeoSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Breadcrumb Schema                                                 */
/* ------------------------------------------------------------------ */

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Service Schema                                                    */
/* ------------------------------------------------------------------ */

export function ServiceSchema({
  serviceType,
  description,
  url,
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    provider: {
      "@type": "Person",
      name: "Maverick Manju",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "City", name: "Bangalore" },
      { "@type": "State", name: "Karnataka" },
      { "@type": "Country", name: "India" },
    ],
    description,
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Schema                                                        */
/* ------------------------------------------------------------------ */

export function FaqSchema({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Export FAQ data so it can be used in both schema and visible UI    */
/* ------------------------------------------------------------------ */

export const FAQ_DATA: FaqItem[] = [
  {
    question: "Who is the best magician in Bangalore?",
    answer:
      "Maverick Manju (also known as Mevrick Manju) is widely regarded as the best magician in Bangalore and Bengaluru. He is a professional magician for hire offering stage magic show, walk-around magic, close-up magic, mentalism show and professional emcee services for corporate events, weddings, birthday parties and private celebrations across Bangalore and India.",
  },
  {
    question: "How much does it cost to hire a magician in Bangalore?",
    answer:
      "The cost of hiring a magician in Bangalore varies based on the type of event, duration, number of guests and services required. As a professional magician in Bangalore and top emcee, Maverick Manju offers customized packages for corporate events, weddings, birthday parties, college events, school events and annual functions. Contact Maverick Manju for a tailored quote.",
  },
  {
    question: "What types of events does Maverick Manju perform at?",
    answer:
      "Maverick Manju is the best magician in Bangalore for corporate events, weddings, birthday parties, brand launches, hotel events, college events, school events, annual functions, team-building activities, gala dinners, award ceremonies and private celebrations. He is also the best emcee in Bengaluru for event hosting and corporate emcee services.",
  },
  {
    question:
      "Does Maverick Manju do both magic and emcee at the same event?",
    answer:
      "Yes! Maverick Manju is unique because he combines magic, mentalism and professional emcee hosting into one complete entertainment experience. As both the best magician in Bangalore and top emcee in Bengaluru, there is no need to hire separate entertainers for your event.",
  },
  {
    question: "Can I book Maverick Manju for events outside Bangalore?",
    answer:
      "Absolutely! While Maverick Manju is based in Bangalore (Bengaluru), he is a professional magician for hire who travels across India and internationally for events. He is the top magician in Bangalore and best event host in Bengaluru available for booking anywhere in the world.",
  },
  {
    question: "What is mentalism and how is it different from magic?",
    answer:
      "Mentalism is a performing art focused on mind reading, predictions, psychological influence and demonstrations of heightened intuition. Maverick Manju is the best mentalist in Bangalore and Bengaluru. While a magic show focuses on visual illusions, a mentalism show creates an experience that feels genuinely impossible — as if the mentalist can truly read minds.",
  },
  {
    question: "How do I book Maverick Manju for my event?",
    answer:
      "You can book Maverick Manju — the best magician in Bangalore — by visiting the Book page on this website, calling +91 98860 00000, or emailing bookings@maverickmanju.in. Whether you need a magician for corporate events, birthday party, wedding or private party in Bangalore, share your event date, venue and expected guest count for a quick response.",
  },
];
