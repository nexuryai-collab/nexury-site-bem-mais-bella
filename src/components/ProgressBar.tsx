// Componente ProgressBar — leitura (referencia RETENCAO.md)
export default function ProgressBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-[rgba(36,0,70,0.8)]">
      <div className="h-full bg-gradient-to-r from-[#F72585] to-[#e85d8a] w-[30%] animate-pulse" />
    </div>
  );
}