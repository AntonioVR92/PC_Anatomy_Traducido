import { notFound } from "next/navigation";
import { COMPONENTS, getComponent } from "@/lib/components";
import { DetailView } from "@/components/detail/DetailView";

export function generateStaticParams() {
  return COMPONENTS.map((c) => ({ slug: c.id }));
}

export default async function ComponentPage({
  params,
}: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) notFound();
  return <DetailView component={component} />;
}
