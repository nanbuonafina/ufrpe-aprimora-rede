import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2, ClipboardList, Loader2, TriangleAlert } from 'lucide-react'
import { Container } from './ui/Container'
import { municipiosFormulario, assessoriaTipos } from '../data/content'
import { submitAssessoria } from '../lib/submitAssessoria'

export interface AssessoriaPrefill {
  nomeOrganizacao?: string
  municipio?: string
}

interface FormState {
  nomeOrganizacao: string
  nomeResponsavel: string
  email: string
  telefone: string
  municipio: string
  tipoAssessoria: string
  mensagem: string
}

const EMPTY_FORM: FormState = {
  nomeOrganizacao: '',
  nomeResponsavel: '',
  email: '',
  telefone: '',
  municipio: '',
  tipoAssessoria: '',
  mensagem: '',
}

type FieldErrors = Partial<Record<keyof FormState, string>>

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {}
  if (!form.nomeOrganizacao.trim()) errors.nomeOrganizacao = 'Informe o nome da organização.'
  if (!form.nomeResponsavel.trim()) errors.nomeResponsavel = 'Informe o nome do responsável.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Informe um e-mail válido.'
  if (!form.municipio) errors.municipio = 'Selecione o município.'
  if (!form.tipoAssessoria) errors.tipoAssessoria = 'Selecione o tipo de assessoria.'
  if (form.mensagem.trim().length < 10) errors.mensagem = 'Descreva brevemente a necessidade (mín. 10 caracteres).'
  return errors
}

export function AssessoriaForm({ prefill }: { prefill?: AssessoriaPrefill | null }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    if (!prefill) return
    setForm((prev) => ({
      ...prev,
      nomeOrganizacao: prefill.nomeOrganizacao ?? prev.nomeOrganizacao,
      municipio: prefill.municipio ?? prev.municipio,
    }))
  }, [prefill])

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validation = validate(form)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus('submitting')
    const result = await submitAssessoria(form)

    if (result.ok) {
      setStatus('success')
      setStatusMessage(
        result.dryRun
          ? 'Solicitação registrada (modo de demonstração — configure o webhook para envio real).'
          : 'Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.',
      )
      setForm(EMPTY_FORM)
    } else {
      setStatus('error')
      setStatusMessage(result.error ?? 'Não foi possível enviar sua solicitação. Tente novamente.')
    }
  }

  return (
    <section id="assessoria" className="scroll-mt-20 bg-base-light py-20">
      <Container className="max-w-3xl">
        <div className="rounded-3xl border border-primary/25 bg-surface-warm p-6 shadow-card sm:p-10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <ClipboardList size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-primary-dark sm:text-xl">
                Solicitar assessoria do NOSCas
              </h2>
              <p className="text-sm text-primary-dark/80">
                Preencha o formulário e nossa equipe entrará em contato para agendar um atendimento
                gratuito.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Nome da organização" error={errors.nomeOrganizacao} className="sm:col-span-2">
              <input
                type="text"
                value={form.nomeOrganizacao}
                onChange={(e) => updateField('nomeOrganizacao', e.target.value)}
                placeholder="Ex: Associação..."
                className={inputClass(!!errors.nomeOrganizacao)}
                aria-invalid={!!errors.nomeOrganizacao}
              />
            </Field>

            <Field label="Nome do responsável" error={errors.nomeResponsavel}>
              <input
                type="text"
                value={form.nomeResponsavel}
                onChange={(e) => updateField('nomeResponsavel', e.target.value)}
                placeholder="Seu nome completo"
                className={inputClass(!!errors.nomeResponsavel)}
                aria-invalid={!!errors.nomeResponsavel}
              />
            </Field>

            <Field label="E-mail" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="voce@organizacao.org"
                className={inputClass(!!errors.email)}
                aria-invalid={!!errors.email}
              />
            </Field>

            <Field label="Telefone / WhatsApp" error={errors.telefone}>
              <input
                type="tel"
                value={form.telefone}
                onChange={(e) => updateField('telefone', e.target.value)}
                placeholder="(81) 9 0000-0000"
                className={inputClass(!!errors.telefone)}
              />
            </Field>

            <Field label="Município" error={errors.municipio}>
              <select
                value={form.municipio}
                onChange={(e) => updateField('municipio', e.target.value)}
                className={inputClass(!!errors.municipio)}
                aria-invalid={!!errors.municipio}
              >
                <option value="">Selecione...</option>
                {municipiosFormulario.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Tipo de assessoria" error={errors.tipoAssessoria} className="sm:col-span-2">
              <select
                value={form.tipoAssessoria}
                onChange={(e) => updateField('tipoAssessoria', e.target.value)}
                className={inputClass(!!errors.tipoAssessoria)}
                aria-invalid={!!errors.tipoAssessoria}
              >
                <option value="">Selecione...</option>
                {assessoriaTipos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Mensagem" error={errors.mensagem} className="sm:col-span-2">
              <textarea
                value={form.mensagem}
                onChange={(e) => updateField('mensagem', e.target.value)}
                rows={4}
                placeholder="Conte um pouco sobre a necessidade da sua organização..."
                className={inputClass(!!errors.mensagem)}
                aria-invalid={!!errors.mensagem}
              />
            </Field>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'submitting' && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
                {status === 'submitting' ? 'Enviando...' : 'Enviar solicitação'}
              </button>

              {status === 'success' && (
                <p role="status" className="mt-3 flex items-center gap-2 rounded-lg bg-olive/10 px-3 py-2.5 text-sm text-olive">
                  <CheckCircle2 size={16} className="shrink-0" aria-hidden="true" />
                  {statusMessage}
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
                  <TriangleAlert size={16} className="shrink-0" aria-hidden="true" />
                  {statusMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}

function Field({
  label,
  error,
  children,
  className = '',
}: {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/30 ${
    hasError ? 'border-red-400' : 'border-line focus:border-primary'
  }`
}
