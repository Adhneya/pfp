import { Navigation } from "./component/navigation";
import { Hero } from "./component/hero";
import { Skills } from "./component/skills";
import { Contact } from "./component/contact";
import Image from "next/image";

export default function Page() {
  return (
    <main>
      <Navigation />
      <Hero />

      {/* Services Section */}
      <section
        id="services"
        className="mx-auto max-w-5xl px-4 py-16"
        style={{ scrollMarginTop: "4.5rem" }}
      >
        <h2 className="text-2xl font-semibold md:text-3xl">Services</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">
          I offer end-to-end web development, from design systems to API
          development and deployment.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Product Design</h3>
            <p className="text-sm text-foreground/70">Wireframes, UI kits, motion specs.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Full-Stack Apps</h3>
            <p className="text-sm text-foreground/70">Next.js, APIs, databases, auth.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Performance</h3>
            <p className="text-sm text-foreground/70">Core Web Vitals, caching, DX.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="mx-auto max-w-5xl px-4 py-16"
        style={{ scrollMarginTop: "4.5rem" }}
      >
        <h2 className="text-2xl font-semibold md:text-3xl">About</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">
          I’m a developer focused on building delightful user experiences with a strong foundation in engineering best practices.
        </p>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="mx-auto max-w-5xl px-4 py-16"
        style={{ scrollMarginTop: "4.5rem" }}
      >
        <h2 className="text-2xl font-semibold md:text-3xl">Portfolio</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="overflow-hidden rounded-lg border">
              <Image
                src={`/project-abstract.png?key=f4dda&height=240&width=400&query=Project ${i} showcase`}
                alt={`Project ${i}`}
                width={400}
                height={240}
                className="h-40 w-full object-cover"
                priority={i <= 2}
              />
              <div className="p-3">
                <h3 className="font-medium">Project {i}</h3>
                <p className="text-sm text-foreground/70">Short description of the project.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Contact */}
      <Skills />
      <Contact />

      <footer className="border-t py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-foreground/60">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
