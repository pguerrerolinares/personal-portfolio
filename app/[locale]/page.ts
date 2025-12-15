import { setRequestLocale } from "next-intl/server";
import {
  Hero,
  About,
  Projects,
  Experience,
  Contact,
} from "@/components/sections";
import { h } from "@/lib/react-helpers";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return h('main', {
    id: "main-content",
    children: [
      h(Hero, { key: 'hero' }),
      h(About, { key: 'about' }),
      h(Projects, { key: 'projects' }),
      h(Experience, { key: 'experience' }),
      h(Contact, { key: 'contact' })
    ]
  });
}
