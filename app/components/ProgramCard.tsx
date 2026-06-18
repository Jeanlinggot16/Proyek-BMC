export default function ProgramCard({ title, desc, tag }: { title: string, desc: string, tag: string }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-colors">
      <span className="text-red-400 text-xs font-bold uppercase tracking-widest">{tag}</span>
      <h3 className="text-xl font-bold mt-2 mb-3">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}