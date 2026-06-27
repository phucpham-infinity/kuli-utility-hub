import { Link } from 'react-router-dom'

type UtilityItem = {
  id: string
  name: string
  description: string
  href: string
  logo: string
  status: 'Ready' | 'Soon'
}

const utilities: UtilityItem[] = [
  {
    id: '01',
    name: 'Page to Quiz',
    description: 'Scan current page and generate multiple-choice questions.',
    href: '/quiz',
    logo: 'QZ',
    status: 'Ready',
  },
  {
    id: '02',
    name: 'Summarizer',
    description: 'Compress long pages into structured notes.',
    href: '#',
    logo: 'SM',
    status: 'Soon',
  },
  {
    id: '03',
    name: 'Media Extractor',
    description: 'Collect page images, video, audio, and transcripts.',
    href: '#',
    logo: 'MX',
    status: 'Soon',
  },
  {
    id: '04',
    name: 'Prompt Lab',
    description: 'Shape reusable prompts from page context.',
    href: '#',
    logo: 'PL',
    status: 'Soon',
  },
]

export function HomePage() {
  return (
    <main className="min-h-[560px] w-[420px] bg-white text-black swiss-noise">
      <header className="border-b-4 border-black p-6 swiss-grid-pattern">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#ff3000]">Kuli Utility Hub</p>
        <h1 className="max-w-[9ch] text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em]">
          Utility Index
        </h1>
      </header>

      <section className="grid grid-cols-2 border-b-4 border-black" aria-label="Utility summary">
        <div className="border-r-4 border-black p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">Tools</p>
          <p className="mt-3 text-5xl font-black leading-none tracking-[-0.08em]">04</p>
        </div>
        <div className="bg-[#f2f2f2] p-4 swiss-dots">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">Mode</p>
          <p className="mt-4 text-sm font-bold uppercase leading-4">Grid / Direct / Precise</p>
        </div>
      </section>

      <section className="grid grid-cols-2" aria-label="Utilities">
        {utilities.map((utility) => (
          <UtilityCard utility={utility} key={utility.id} />
        ))}
      </section>
    </main>
  )
}

type UtilityCardProps = {
  utility: UtilityItem
}

function UtilityCard({ utility }: UtilityCardProps) {
  const isReady = utility.status === 'Ready'
  const content = (
    <article className="group flex min-h-48 flex-col border-b-4 border-r-4 border-black bg-white p-4 transition duration-150 ease-linear hover:bg-[#ff3000] focus-visible:bg-[#ff3000]">
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-14 place-items-center border-4 border-black bg-black text-lg font-black tracking-[-0.08em] text-white transition duration-150 ease-linear group-hover:bg-white group-hover:text-black group-focus-visible:bg-white group-focus-visible:text-black">
          {utility.logo}
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.18em]">{utility.id}</span>
      </div>

      <div className="mt-auto pt-6">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#ff3000] transition duration-150 ease-linear group-hover:text-black group-focus-visible:text-black">
          {utility.status}
        </p>
        <h2 className="text-2xl font-black uppercase leading-[0.95] tracking-[-0.06em]">{utility.name}</h2>
        <p className="mt-3 text-xs font-medium leading-4">{utility.description}</p>
      </div>
    </article>
  )

  if (!isReady) {
    return (
      <div aria-disabled="true" className="cursor-not-allowed opacity-75">
        {content}
      </div>
    )
  }

  return (
    <Link className="block outline-none focus-visible:ring-4 focus-visible:ring-[#ff3000] focus-visible:ring-offset-0" to={utility.href}>
      {content}
    </Link>
  )
}
