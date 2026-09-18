import { useEffect, useState } from 'react'
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { site } from '../data/content'
import { fetchInstagramPosts, type InstagramPost } from '../lib/instagram'

const FALLBACK_POSTS = [
  { tag: 'Lançamento', caption: 'Aprimora Rede+ é lançado oficialmente na UFRPE ✨', tone: 'primary' as const },
  { tag: 'Diagnóstico', caption: 'Mapeamento das OSCs da RMR segue a todo vapor 🗺️', tone: 'olive' as const },
  { tag: 'Capacitação', caption: 'Confira os próximos encontros de educação permanente 📚', tone: 'accent' as const },
  { tag: 'Bastidores', caption: 'Equipe do NOSCas em campo com as organizações parceiras 🤝', tone: 'primary' as const },
]

const toneBg = {
  primary: 'from-primary to-primary-dark',
  olive: 'from-olive to-olive-dark',
  accent: 'from-accent to-primary',
}

export function NewsSection() {
  const [posts, setPosts] = useState<InstagramPost[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const token = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN as string | undefined
    if (!token) return

    fetchInstagramPosts(token)
      .then(setPosts)
      .catch(() => setError(true))
  }, [])

  const useFallback = !posts || error

  return (
    <section id="novidades" className="scroll-mt-20 bg-white py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Últimas novidades"
            title="Novidades do projeto"
            description="Acompanhe as publicações mais recentes do Aprimora Rede+ no Instagram: bastidores, capacitações e novidades direto do território da RMR."
          />
          <a
            href={`https://instagram.com/${site.instagramHandle.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-primary-dark"
          >
            <Instagram size={16} aria-hidden="true" />
            {site.instagramHandle}
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {useFallback
            ? FALLBACK_POSTS.map((post, i) => (
                <div
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-2xl shadow-card"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${toneBg[post.tone]} transition-transform duration-300 group-hover:scale-105`} />
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <span className="w-fit rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                      {post.tag}
                    </span>
                    <div>
                      <p className="text-xs font-medium leading-snug text-white">{post.caption}</p>
                      <div className="mt-2 flex items-center gap-3 text-white/80">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Heart size={12} aria-hidden="true" /> —
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <MessageCircle size={12} aria-hidden="true" /> —
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : posts!.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-ink-soft shadow-card"
                >
                  {post.mediaUrl && (
                    <img
                      src={post.mediaUrl}
                      alt={post.caption || 'Publicação do Instagram'}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <span className="absolute right-2 top-2 rounded-full bg-black/40 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <ExternalLink size={14} aria-hidden="true" />
                  </span>
                </a>
              ))}
        </div>
      </Container>
    </section>
  )
}
