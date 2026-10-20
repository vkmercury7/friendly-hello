import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleCheck,
  Clock3,
  Layers3,
  Menu,
  MoveRight,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createPublicLead, type PublicLeadInput } from '@/lib/leads';

export const Route = createFileRoute('/')({
  component: Index,
});

const navigation = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Método', href: '#metodo' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Diagnóstico', href: '#diagnostico' },
];

const initialForm: PublicLeadInput = {
  nome: '',
  email: '',
  telefone: '',
  empresa: '',
  observacoes: '',
};

type FormErrors = Partial<Record<keyof PublicLeadInput, string>>;

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function Index() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [form, setForm] = React.useState<PublicLeadInput>(initialForm);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<FormStatus>('idle');

  const updateField = (field: keyof PublicLeadInput) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== 'idle') setStatus('idle');
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!form.nome.trim()) nextErrors.nome = 'Informe seu nome.';
    if (!form.empresa.trim()) nextErrors.empresa = 'Informe sua empresa.';
    if (!form.email.trim()) {
      nextErrors.email = 'Informe seu melhor e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Digite um e-mail válido.';
    }
    if (!form.telefone.trim()) nextErrors.telefone = 'Informe seu telefone.';
    if (!form.observacoes.trim()) nextErrors.observacoes = 'Conte brevemente o seu desafio.';
    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      await createPublicLead(form);
      setForm(initialForm);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className='min-h-screen overflow-hidden bg-background text-foreground'>
      <section className='relative isolate bg-[#101416] text-white'>
        <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_15%,rgba(190,255,94,0.18),transparent_30%),radial-gradient(circle_at_8%_80%,rgba(91,112,255,0.16),transparent_32%)]' />
        <div className='absolute right-[-10rem] top-24 -z-10 h-96 w-96 rounded-full border border-white/10' />
        <div className='absolute right-[-5rem] top-44 -z-10 h-64 w-64 rounded-full border border-white/10' />

        <header className='mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10'>
          <a href='#top' className='flex items-center gap-3' aria-label='LAUX Agência, início'>
            <span className='flex size-10 items-center justify-center rounded-xl bg-[#c9ff68] text-[#101416] shadow-[0_0_30px_rgba(201,255,104,0.24)]'>
              <Sparkles className='size-5' />
            </span>
            <span className='text-sm font-semibold uppercase tracking-[0.26em]'>LAUX <span className='text-[#c9ff68]'>AGÊNCIA</span></span>
          </a>

          <nav className='hidden items-center gap-8 lg:flex' aria-label='Navegação principal'>
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className='text-sm text-white/65 transition-colors hover:text-[#c9ff68]'>
                {item.label}
              </a>
            ))}
          </nav>

          <Button asChild className='hidden rounded-full bg-[#c9ff68] px-5 text-[#101416] hover:bg-[#d9ff91] lg:inline-flex'>
            <a href='#diagnostico'>Começar agora <ArrowRight /></a>
          </Button>

          <button
            type='button'
            className='inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden'
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {menuOpen && (
          <nav className='mx-6 mb-5 flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-3 lg:hidden' aria-label='Menu mobile'>
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className='rounded-xl px-4 py-3 text-sm text-white/75 hover:bg-white/10 hover:text-[#c9ff68]'>
                {item.label}
              </a>
            ))}
            <a href='#diagnostico' onClick={() => setMenuOpen(false)} className='mt-2 rounded-xl bg-[#c9ff68] px-4 py-3 text-center text-sm font-semibold text-[#101416]'>
              Começar agora
            </a>
          </nav>
        )}

        <div id='top' className='mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:pb-36 lg:pt-24'>
          <div>
            <div className='mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#c9ff68]'>
              <span className='size-1.5 rounded-full bg-[#c9ff68]' /> Crescimento com clareza
            </div>
            <h1 className='max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-8xl'>
              A operação que transforma <span className='text-[#c9ff68]'>potencial</span> em resultado.
            </h1>
            <p className='mt-8 max-w-xl text-lg leading-8 text-white/60 sm:text-xl'>
              Estratégia, aquisição e processos em uma única operação para empresas que querem crescer sem perder o controle.
            </p>
            <div className='mt-10 flex flex-col gap-3 sm:flex-row'>
              <Button asChild size='lg' className='h-14 rounded-full bg-[#c9ff68] px-7 text-[#101416] hover:bg-[#d9ff91]'>
                <a href='#diagnostico'>Quero acelerar meu negócio <ArrowRight /></a>
              </Button>
              <Button asChild size='lg' variant='ghost' className='h-14 rounded-full px-7 text-white hover:bg-white/10 hover:text-white'>
                <a href='#metodo'>Descobrir como funciona <ChevronDown /></a>
              </Button>
            </div>
            <div className='mt-14 flex flex-wrap gap-x-8 gap-y-4 text-sm text-white/45'>
              <span className='flex items-center gap-2'><Check className='size-4 text-[#c9ff68]' /> Visão estratégica</span>
              <span className='flex items-center gap-2'><Check className='size-4 text-[#c9ff68]' /> Execução orientada a dados</span>
              <span className='flex items-center gap-2'><Check className='size-4 text-[#c9ff68]' /> Operação sob medida</span>
            </div>
          </div>

          <div className='relative mx-auto w-full max-w-lg lg:ml-auto'>
            <div className='relative rounded-[2rem] border border-white/15 bg-white/[0.07] p-3 shadow-2xl backdrop-blur-sm'>
              <div className='rounded-[1.5rem] bg-[#f5f5ef] p-6 text-[#101416] sm:p-8'>
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-[#687067]'>Visão da operação</p>
                    <p className='mt-2 text-2xl font-semibold tracking-tight'>Crescimento em movimento</p>
                  </div>
                  <span className='flex size-10 items-center justify-center rounded-full bg-[#c9ff68]'><Zap className='size-5' /></span>
                </div>
                <div className='mt-8 grid grid-cols-2 gap-3'>
                  <div className='rounded-2xl bg-[#101416] p-4 text-white'><p className='text-xs text-white/50'>Leads ativos</p><p className='mt-3 text-3xl font-semibold'>248</p><p className='mt-1 text-xs text-[#c9ff68]'>+32,8% este mês</p></div>
                  <div className='rounded-2xl border border-[#dfe2d8] p-4'><p className='text-xs text-[#687067]'>Conversão</p><p className='mt-3 text-3xl font-semibold'>18,4%</p><p className='mt-1 text-xs text-[#687067]'>acima da meta</p></div>
                </div>
                <div className='mt-3 rounded-2xl border border-[#dfe2d8] p-4'>
                  <div className='flex items-center justify-between text-xs text-[#687067]'><span>Pipeline comercial</span><span className='font-semibold text-[#101416]'>R$ 184.500</span></div>
                  <div className='mt-5 flex h-24 items-end gap-2'>
                    {[38, 52, 44, 68, 58, 78, 92].map((height, index) => <span key={index} className='flex-1 rounded-t-md bg-[#c9ff68]' style={{ height: `${height}%`, opacity: 0.45 + index * 0.08 }} />)}
                  </div>
                </div>
                <div className='mt-3 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm'><span className='flex size-9 items-center justify-center rounded-full bg-[#eaf6d3]'><CircleCheck className='size-5 text-[#507d19]' /></span><div><p className='text-sm font-semibold'>Próxima ação definida</p><p className='text-xs text-[#687067]'>Follow-up inteligente em 2h</p></div></div>
              </div>
            </div>
            <div className='absolute -bottom-7 -left-7 hidden rounded-2xl border border-white/15 bg-[#222a25] p-4 shadow-xl sm:block'><p className='text-xs text-white/45'>Tempo para clareza</p><p className='mt-1 text-xl font-semibold text-[#c9ff68]'>7 dias</p></div>
          </div>
        </div>
      </section>

      <section className='border-b border-border bg-[#f5f5ef]'>
        <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-8 text-sm text-muted-foreground lg:px-10'>
          <span className='uppercase tracking-[0.18em]'>Para negócios que não querem improvisar</span>
          <div className='flex flex-wrap items-center gap-6 font-medium text-foreground/60 sm:gap-10'><span>Estratégia</span><span>Aquisição</span><span>Vendas</span><span>Processos</span><span>Performance</span></div>
        </div>
      </section>

      <section id='solucoes' className='mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32'>
        <div className='max-w-2xl'><p className='text-sm font-semibold uppercase tracking-[0.2em] text-[#6d9d25]'>Uma visão 360º</p><h2 className='mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl'>Menos ruído. Mais direção para cada próxima decisão.</h2></div>
        <div className='mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {[
            { icon: Target, title: 'Estratégia', text: 'Posicionamento e prioridades que conectam sua visão ao mercado.' },
            { icon: Users, title: 'Aquisição', text: 'Canais e campanhas desenhados para atrair as oportunidades certas.' },
            { icon: Layers3, title: 'Operação', text: 'Processos claros para o time vender, entregar e escalar melhor.' },
            { icon: Zap, title: 'Performance', text: 'Acompanhamento contínuo para transformar dados em ação.' },
          ].map((item) => (
            <article key={item.title} className='group rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-[#c9ff68] hover:shadow-xl'>
              <span className='flex size-12 items-center justify-center rounded-2xl bg-[#eef8d9] text-[#527b1e] transition-colors group-hover:bg-[#c9ff68]'><item.icon className='size-5' /></span>
              <h3 className='mt-8 text-xl font-semibold'>{item.title}</h3><p className='mt-3 text-sm leading-6 text-muted-foreground'>{item.text}</p><a href='#diagnostico' className='mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground'>Explorar <MoveRight className='size-4 transition-transform group-hover:translate-x-1' /></a>
            </article>
          ))}
        </div>
      </section>

      <section id='metodo' className='bg-[#101416] text-white'>
        <div className='mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-32'>
          <div><p className='text-sm font-semibold uppercase tracking-[0.2em] text-[#c9ff68]'>O método LAUX</p><h2 className='mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl'>Clareza antes de velocidade.</h2><p className='mt-6 max-w-md leading-7 text-white/55'>A gente começa entendendo o todo, escolhe o que realmente importa e constrói uma operação que evolui junto com o negócio.</p></div>
          <div className='grid gap-3'>
            {[
              ['01', 'Diagnóstico', 'Mapeamos o momento atual, os gargalos e as oportunidades que estão escondidas na operação.'],
              ['02', 'Arquitetura', 'Transformamos objetivos em um plano de ação com prioridades, responsáveis e métricas.'],
              ['03', 'Aceleração', 'Executamos, medimos e refinamos continuamente para sustentar o próximo nível.'],
            ].map(([number, title, text]) => <div key={number} className='grid grid-cols-[3.5rem_1fr] gap-5 rounded-3xl border border-white/10 p-6 transition-colors hover:bg-white/5 sm:grid-cols-[5rem_1fr] sm:p-8'><span className='text-sm font-semibold text-[#c9ff68]'>{number}</span><div><h3 className='text-xl font-semibold'>{title}</h3><p className='mt-2 max-w-xl text-sm leading-6 text-white/50'>{text}</p></div></div>)}
          </div>
        </div>
      </section>

      <section id='resultados' className='bg-[#c9ff68]'>
        <div className='mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10 lg:py-20'><div><p className='text-sm font-semibold uppercase tracking-[0.2em] text-[#426116]'>O que muda na prática</p><h2 className='mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[#101416] sm:text-5xl'>Uma operação mais leve para decisões mais confiantes.</h2></div><div className='grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3'><div><p className='text-4xl font-semibold text-[#101416]'>+42%</p><p className='mt-1 text-sm text-[#426116]'>eficiência comercial</p></div><div><p className='text-4xl font-semibold text-[#101416]'>3x</p><p className='mt-1 text-sm text-[#426116]'>mais visibilidade</p></div><div><p className='text-4xl font-semibold text-[#101416]'>100%</p><p className='mt-1 text-sm text-[#426116]'>foco no essencial</p></div></div></div>
      </section>

      <section id='diagnostico' className='mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-32'>
        <div><p className='text-sm font-semibold uppercase tracking-[0.2em] text-[#6d9d25]'>Próximo passo</p><h2 className='mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl'>Vamos encontrar o seu próximo movimento.</h2><p className='mt-6 max-w-md leading-7 text-muted-foreground'>Responda algumas perguntas e nosso time vai analisar o momento da sua empresa para indicar onde existe mais potencial de crescimento.</p><div className='mt-10 space-y-5 text-sm text-muted-foreground'><p className='flex items-center gap-3'><Clock3 className='size-5 text-[#6d9d25]' /> Retorno em até 1 dia útil</p><p className='flex items-center gap-3'><CircleCheck className='size-5 text-[#6d9d25]' /> Diagnóstico inicial sem compromisso</p><p className='flex items-center gap-3'><Sparkles className='size-5 text-[#6d9d25]' /> Recomendações alinhadas ao seu momento</p></div></div>
        <form onSubmit={handleSubmit} noValidate className='rounded-[2rem] border border-border bg-[#f5f5ef] p-6 sm:p-9'>
          <div className='mb-8'><p className='text-2xl font-semibold tracking-tight'>Conte um pouco sobre você</p><p className='mt-2 text-sm text-muted-foreground'>Todos os campos são importantes para uma conversa mais relevante.</p></div>
          <div className='grid gap-5 sm:grid-cols-2'>
            <Field label='Seu nome' error={errors.nome}><Input value={form.nome} onChange={updateField('nome')} placeholder='Como podemos te chamar?' /></Field>
            <Field label='Empresa' error={errors.empresa}><Input value={form.empresa} onChange={updateField('empresa')} placeholder='Nome da empresa' /></Field>
            <Field label='E-mail profissional' error={errors.email}><Input type='email' value={form.email} onChange={updateField('email')} placeholder='voce@empresa.com' /></Field>
            <Field label='Telefone' error={errors.telefone}><Input value={form.telefone} onChange={updateField('telefone')} placeholder='(00) 00000-0000' /></Field>
          </div>
          <div className='mt-5'><Field label='Qual é o seu principal desafio hoje?' error={errors.observacoes}><Textarea value={form.observacoes} onChange={updateField('observacoes')} placeholder='Ex.: precisamos gerar mais oportunidades, organizar o comercial...' className='min-h-32 resize-none' /></Field></div>
          <div className='mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'><p className='max-w-xs text-xs leading-5 text-muted-foreground'>Ao enviar, você concorda em receber o retorno da equipe LAUX sobre este diagnóstico.</p><Button type='submit' size='lg' disabled={status === 'submitting'} className='h-12 rounded-full bg-[#101416] px-6 text-white hover:bg-[#26302a]'>{status === 'submitting' ? 'Enviando...' : 'Enviar diagnóstico'} <ArrowRight /></Button></div>
          {status === 'success' && <div className='mt-5 flex items-center gap-3 rounded-2xl bg-[#e5f6c8] p-4 text-sm text-[#426116]' role='status'><CircleCheck className='size-5 shrink-0' /> Recebemos suas informações. Em breve entraremos em contato.</div>}
          {status === 'error' && <div className='mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700' role='alert'>Não foi possível enviar agora. Revise os dados e tente novamente.</div>}
        </form>
      </section>

      <footer className='border-t border-border bg-[#101416] text-white'>
        <div className='mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10'><a href='#top' className='flex items-center gap-3'><span className='flex size-9 items-center justify-center rounded-xl bg-[#c9ff68] text-[#101416]'><Sparkles className='size-4' /></span><span className='text-sm font-semibold uppercase tracking-[0.24em]'>LAUX <span className='text-[#c9ff68]'>AGÊNCIA</span></span></a><p className='text-sm text-white/45'>Estratégia para negócios em movimento.</p><p className='text-xs text-white/30'>© {new Date().getFullYear()} LAUX AGÊNCIA</p></div>
      </footer>
    </main>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className='block space-y-2 text-sm font-medium text-foreground'><span>{label}</span>{children}{error && <span className='block text-xs font-normal text-destructive'>{error}</span>}</label>;
}
