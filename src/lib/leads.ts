export type PublicLeadInput = {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  observacoes: string;
};

const getSupabaseConfig = () => {
  const env = import.meta.env as Record<string, string | undefined>;
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY ?? env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error('A configuração pública do Supabase não está disponível.');
  }

  return { url: url.replace(/\/$/, ''), key };
};

export async function createPublicLead(input: PublicLeadInput): Promise<void> {
  const { url, key } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      nome: input.nome.trim(),
      email: input.email.trim().toLowerCase(),
      telefone: input.telefone.trim(),
      empresa: input.empresa.trim(),
      origem: 'landing_laux',
      observacoes: input.observacoes.trim(),
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || 'Não foi possível registrar o diagnóstico.');
  }
}
