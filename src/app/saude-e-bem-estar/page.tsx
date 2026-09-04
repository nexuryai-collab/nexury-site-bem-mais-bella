'use client';
import { motion } from 'framer-motion';
import KineticText from '../../components/KineticText';
import TiltCard from '../../components/TiltCard';
import Particles from '../../components/Particles';

const artigos = [
  { cat: "Fitness", title: "Treinos Femininos: Como Treinar Sem Quebrar o Corpo", img: "/images/saude-e-bem-estar/fitness-2026/hero.webp", desc: "Treinos adaptados para mulheres com foco em força, flexibilidade e recuperação, respeitando o ciclo hormonal.", author: "Lillith Nogah", read: "10 min", tag: "Fitness Feminino" },
  { cat: "Nutrição", title: "Alimentação para Mulheres: O Que Comer para Equilibrar Hormônios", img: "/images/saude-e-bem-estar/alimentacao-2026/hero.webp", desc: "Guia prático para montar refeições que equilibram hormônios, aumentam energia e evitam inchaços.", author: "Lillith Nogah", read: "10 min", tag: "Nutrição Feminina" },
  { cat: "Mental", title: "Saúde Mental Feminina: Como Lidar com Ansiedade e Estresse do Dia a Dia", img: "/images/saude-e-bem-estar/saude-mental-2026/hero.webp", desc: "Estratégias práticas para manter a saúde mental em dia a dia, com foco em autocuidado e resiliência.", author: "Lillith Nogah", read: "9 min", tag: "Saúde Mental" },
  { cat: "Sono", title: "Sono de Qualidade: Como Dormir Bem para Equilibrar Hormônios", img: "/images/saude-e-bem-estar/sono-2026/hero.webp", desc: "Dicas para melhorar a qualidade do sono, essencial para regulação hormonal e saúde geral.", author: "Lillith Nogah", read: "8 min", tag: "Sono e Recuperação" },
  { cat: "Cuidado Pessoal", title: "Cuidado Pessoal Feminino: Rotina de Bem-Estar Diário", img: "/images/saude-e-bem-estar/cuidado-pessoal-2026/hero.webp", desc: "Ritual diário de autocuidado para mulheres ocupadas — da pele à mente.", author: "Lillith Nogah", read: "9 min", tag: "Autocuidado" },
  { cat: "Prevenção", title: "Exames Essenciais para Mulheres: O Que Fazer Anualmente", img: "/images/saude-e-bem-estar/exames-2026/hero.webp", desc: "Guia completo de exames preventivos recomendados para mulheres de todas as idades.", author: "Lillith Nogah", read: "10 min", tag: "Prevenção" },
  { cat: "Tendências", title: "Tendências de Saúde Feminina 2026: O Que Vem Por Atrás", img: "/images/saude-e-bem-estar/tendencias-2026/hero.webp", desc: "As últimas tendências em saúde feminina: nutrição, exercícios e autocuidado com foco no bem-estar.", author: "Lillith Nogah", read: "11 min", tag: "Tendências" },
  { cat: "Mental", title: "Mindfulness para Mulheres: Como Encontrar Calma no Dia a Dia", img: "/images/saude-e-bem-estar/mindfulness-2026/hero.webp", desc: "Como praticar mindfulness de forma simples e eficaz para reduzir ansiedade e melhorar o foco.", author: "Lillith Nogah", read: "8 min", tag: "Mindfulness" },
  { cat: "Cuidado Pessoal", title: "Rotina de Beleza e Cuidado Pessoal: Dicas para o Dia a Dia", img: "/images/saude-e-bem-estar/cuidado-pessoal-2026/hero.webp", desc: "Dicas de beleza natural e cuidados diários para mulheres que valorizam o bem-estar.", author: "Lillith Nogah", read: "8 min", tag: "Cuidado Pessoal" },
  { cat: "Tendências", title: "Tendências de Saúde Feminina 2026: O Que Vai Chegar em 2026", img: "/images/saude-e-bem-estar/tendencias-2026-2026/hero.webp", desc: "As principais tendências de saúde feminina para 2026: saúde mental, fitness e nutrição.", author: "Lillith Nogah", read: "13 min", tag: "Tendências" },
  { cat: "Prevenção", title: "Saúde Feminina: Como Evitar Problemas Comuns e Manter a Saúde", img: "/images/saude-e-bem-estar/prevenção-2026/hero.webp", desc: "Como prevenir doenças comuns em mulheres e manter a saúde a longo prazo.", author: "Lillith Nogah", read: "10 min", tag: "Prevenção" },
  { cat: "Cuidado Pessoal", title: "Cuidado Pessoal Feminino: Dicas de Beleza e Bem-Estar", img: "/images/saude-e-bem-estar/cuidado-pessoal-2026-2026/hero.webp", desc: "Dicas de beleza natural e cuidados diários para mulheres que valorizam o bem-estar.", author: "Lillith Nogah", read: "8 min", tag: "Cuidado Pessoal" },
];

const subcategorias = ["Fitness", "Nutrição", "Mental", "Sono", "Cuidado Pessoal", "Prevenção", "Tendências", "Skincare", "Beleza", "Slow Aging"];
export default function SaudeBemEstarPage() {
  return (
    <main>
      <h1>Saude e Bem-Estar</h1>
      <p>Conteudo em atualizacao.</p>
    </main>
  );
}
