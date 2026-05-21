import { motion } from "framer-motion"

interface Props {
  title: string
  value: string
  change: string
}

export default function StatCard({
  title,
  value,
  change,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
        cyber-card
        p-5
        md:p-7
        relative
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          top-0
          right-0
          w-20
          h-20
          md:w-28
          md:h-28
          bg-cyan-400/10
          blur-3xl
        "
      />

      <p
        className="
          text-slate-400
          uppercase
          tracking-widest
          text-xs
          md:text-sm
          mb-4
          md:mb-6
        "
      >
        {title}
      </p>

      <div
        className="
          flex
          items-end
          justify-between
        "
      >
        <h1
          className="
            text-4xl
            md:text-6xl
            font-black
            tracking-tight
          "
        >
          {value}
        </h1>

        <span
          className="
            text-cyan-400
            font-bold
            text-sm
            md:text-lg
          "
        >
          {change}
        </span>
      </div>
    </motion.div>
  )
}