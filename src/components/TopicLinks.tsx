// Componente TopicLinks — internal linking (referencia IN-TERNA-LINKING.md)
export default function TopicLinks({ topics }: { topics: string[] }) {
  return (
    <div className="glass-card p-6 rounded-2xl my-8">
      <h3 className="text-xl font-semibold mb-4 gradient-text">Tópicos Relacionados</h3>
      <div className="flex flex-wrap gap-3">
        {topics.map(t => (
          <a key={t} href="#" className="px-4 py-2 rounded-full bg-[rgba(240,72,133,0.1)] text-[#F72585] border border-[#F72585]/20 hover:bg-[#F72585]/20 transition-all text-sm font-medium">{t}</a>
        ))}
      </div>
    </div>
  );
}