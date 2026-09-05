import { notFound } from "next/navigation";
import { marked } from "marked";
import { getSlugs, getArtigo, getTodos } from "@/lib/artigos";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs().filter((s) => s !== '').map((slug) => ({ slug }));
}

export default function ArtigoPage({ params }) {
  const a = getArtigo(params.slug);
  if (!a) notFound();
  const html = marked.parse(a.content);
  return (
    <main className="bg-[#240046] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#F72585]">{a.category}</p>
        <h1 className="mt-4 text-3xl md:text-5xl text-[#f5f0e6]">{a.title}</h1>
        <p className="mt-5 text-[#9AA4AF] text-sm">Por {a.author}</p>
      </div>
      <article className="max-w-3xl mx-auto px-6 pb-20">
        <div className="prose prose-invert prose-lg max-w-none prose-img:rounded-2xl" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
}
