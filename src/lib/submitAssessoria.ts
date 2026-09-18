export interface AssessoriaPayload {
  nomeResponsavel: string
  email: string
  telefone: string
  nomeOrganizacao: string
  municipio: string
  tipoAssessoria: string
  mensagem: string
}

export interface SubmitResult {
  ok: boolean
  dryRun?: boolean
  error?: string
}

/**
 * Envia a solicitação de assessoria para o endpoint configurado.
 *
 * Como configurar a integração com uma planilha:
 *
 * 1) Google Sheets via Google Apps Script
 *    - Crie uma planilha e vá em Extensões > Apps Script.
 *    - Publique um Web App com uma função doPost(e) que grave e.postData.contents
 *      (JSON) em uma nova linha da planilha, e implante como "Qualquer pessoa".
 *    - Copie a URL do Web App para VITE_ASSESSORIA_WEBHOOK_URL no .env.
 *
 * 2) Formspree
 *    - Crie um formulário em formspree.io e use a URL fornecida
 *      (https://formspree.io/f/xxxxxxx) como VITE_ASSESSORIA_WEBHOOK_URL.
 *
 * 3) Supabase (Edge Function ou REST em uma tabela `solicitacoes_assessoria`)
 *    - Aponte VITE_ASSESSORIA_WEBHOOK_URL para a Function/REST endpoint e
 *      inclua a apikey conforme a configuração do seu projeto.
 *
 * 4) Webhook (n8n / Make / Zapier)
 *    - Use a URL do webhook do fluxo como VITE_ASSESSORIA_WEBHOOK_URL.
 *
 * Sem uma URL configurada, o formulário funciona em modo "dry-run": valida
 * os campos, simula o envio e registra o payload no console, para que a
 * experiência completa possa ser demonstrada antes da integração final.
 */
export async function submitAssessoria(payload: AssessoriaPayload): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_ASSESSORIA_WEBHOOK_URL as string | undefined

  if (!endpoint) {
    // eslint-disable-next-line no-console
    console.info('[assessoria] VITE_ASSESSORIA_WEBHOOK_URL não configurado — modo dry-run.', payload)
    await new Promise((resolve) => setTimeout(resolve, 700))
    return { ok: true, dryRun: true }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, enviadoEm: new Date().toISOString() }),
    })

    if (!response.ok) {
      return { ok: false, error: `Falha no envio (status ${response.status}).` }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Não foi possível conectar ao serviço de envio.' }
  }
}
