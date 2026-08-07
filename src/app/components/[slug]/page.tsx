// The detail page for a single computer component, e.g. /components/cpu.
// The [slug] part of the URL tells this page which component to show.

import { notFound } from "next/navigation";
import { COMPONENTS, getComponent } from "@/lib/components";
import { DetailView } from "@/components/detail/DetailView";

// At build time, generate one page for every component so each URL becomes a static page.
export function generateStaticParams() {
  return COMPONENTS.map((c) => ({ slug: c.id }));
}

// The page component. It looks up the component by its URL slug and shows its details.
export default async function ComponentPage({
  params,
}: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const component = getComponent(slug);
  // If no component matches this slug, show the 404 page.
  if (!component) notFound();
  return <DetailView component={component} />;
}
