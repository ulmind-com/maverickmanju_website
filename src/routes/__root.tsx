import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import logo from "@/assets/logo.png";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { GlobalSeoSchemas } from "@/components/site/SeoSchemas";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Maverick Manju — Best Magician in Bangalore | Top Emcee & Mentalist in Bengaluru" },
      {
        name: "description",
        content:
          "Maverick Manju is the best magician in Bangalore and top emcee in Bengaluru. Professional magician for hire offering stage magic show, walk-around magic, close-up magic, mentalism show and interactive emcee entertainment for corporate events, weddings, birthday parties and private celebrations across India.",
      },
      { name: "author", content: "Maverick Manju" },
      {
        name: "keywords",
        content:
          "best magician in bangalore, best magician in bengaluru, best magician near me, top magician in bangalore, top magician in bengaluru, magician in bangalore, magician in bengaluru, magician near me, professional magician in bangalore, professional magician in bengaluru, magic show in bangalore, magic show in bengaluru, best magic show in bangalore, mentalist in bangalore, best mentalist in bangalore, best emcee in bangalore, best emcee in bengaluru, top emcee in bangalore, top emcee in bengaluru, emcee in bangalore, professional emcee in bangalore, event host in bangalore, best event host in bangalore, maverick manju, mevrick manju, maverick manju magician, maverick manju emcee, maverick manju mentalist, maverick manju bangalore, corporate magician in bangalore, wedding magician in bangalore, birthday magician in bangalore, party magician in bangalore",
      },
      /* Robots: max indexing directives */
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      /* Geo / Local SEO */
      { name: "geo.region", content: "IN-KA" },
      { name: "geo.placename", content: "Bangalore" },
      { name: "geo.position", content: "12.9716;77.5946" },
      { name: "ICBM", content: "12.9716, 77.5946" },
      /* Theme */
      { name: "theme-color", content: "#000000" },
      /* Open Graph defaults */
      { property: "og:site_name", content: "Maverick Manju" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      {
        property: "og:image",
        content: "https://www.maverickmanju.in/images/hero-manju-magic.jpg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      /* Twitter Card defaults */
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@maverickmanju" },
      { name: "twitter:creator", content: "@maverickmanju" },
      {
        name: "twitter:image",
        content: "https://www.maverickmanju.in/images/hero-manju-magic.jpg",
      },
    ],
    links: [
      { rel: "icon", type: "image/png", href: logo },
      { rel: "apple-touch-icon", href: logo },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      /* Canonical — homepage default; individual routes override */
      { rel: "canonical", href: "https://www.maverickmanju.in/" },
      /* hreflang for India + generic English */
      {
        rel: "alternate",
        hrefLang: "en-in",
        href: "https://www.maverickmanju.in/",
      },
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://www.maverickmanju.in/",
      },
    ],
  }),
  scripts: () => [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-G9G2TJT67M",
      async: true,
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-G9G2TJT67M');
      `,
    },
  ],
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <GlobalSeoSchemas />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}
