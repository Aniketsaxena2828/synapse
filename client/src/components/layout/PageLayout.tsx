interface Props {

  tag: string

  title: string

  description: string

  children: React.ReactNode
}

export default function PageLayout({
  tag,
  title,
  description,
  children,
}: Props) {

  return (

    <div className="p-8">

      <div className="mb-10">

        <p className="
          text-cyan-400

          uppercase

          tracking-[0.25em]

          text-sm

          mb-3
        ">
          {tag}
        </p>

        <h1 className="
          text-6xl

          font-black

          tracking-tight

          leading-none

          mb-4
        ">
          {title}
        </h1>

        <p className="
          text-slate-400

          text-lg

          max-w-[700px]
        ">
          {description}
        </p>

      </div>

      {children}

    </div>
  )
}