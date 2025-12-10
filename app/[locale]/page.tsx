import { setRequestLocale } from "next-intl/server";
import {
  Hero,
  About,
  Projects,
  Experience,
  Contact,
} from "@/components/sections";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
