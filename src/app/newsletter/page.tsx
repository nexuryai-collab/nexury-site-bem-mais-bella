import { useState } from 'react';
export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Simulação de envio - em produção, isso seria uma chamada API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-emerald-950 text-white px-8 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-amber-400">
          Newsletter Lillith Nogah
        </h1>
        <p className="text-2xl md:text-4xl text-slate-300 mb-12">
          Receba conteúdos exclusivos sobre moda, saúde, carreira, finanças e desenvolvimento pessoal. 
          Sem spam. Unsubscribe a qualquer momento.
        </p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium text-amber-400 mb-1">Endereço de e-mail</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg border border-amber-600/50 bg-slate-900/50 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="seu@email.com"
            />
          </div>
          <button 
            type="submit" 
            onSubmit={handleSubmit}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-lg transition duration-200"
            disabled={status === "in_progress"}
          >
            {status === "idle" ? "Assinar Grátis" : status === "success" ? "Aguardando Confirmação" : "Tentando Novamente"}
          </button>
        </form>
        <div className="mt-8 text-center">
          {status === "success" && <p className="text-amber-400">✓ Enviado com sucesso! Verifique seu e-mail.</p>}
          {status === "error" && <p className="text-red-400">⚠ Erro ao enviar. Tente novamente.</p>}
        </div>
      </div>
    </main>
  );
}
