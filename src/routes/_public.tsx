import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Nested public pages render here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
