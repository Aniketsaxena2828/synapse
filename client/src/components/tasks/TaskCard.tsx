interface TaskCardProps {
  title: string
  description: string
  priority: string
  status: string
}

export default function TaskCard({
  title,
  description,
  priority,
  status,
}: TaskCardProps) {

  return (
    <div
      className="
      bg-card
      border border-border
      rounded-2xl
      p-5

      hover:border-primary
      hover:-translate-y-1

      transition-all
    "
    >

      <div
        className="
        flex items-center
        justify-between
        mb-4
      "
      >

        <span
          className="
          bg-primary/20
          text-primary

          px-3 py-1
          rounded-full
          text-sm
        "
        >
          {priority}
        </span>

        <span className="text-muted">
          {status}
        </span>

      </div>

      <h2
        className="
        text-xl
        font-bold
        mb-2
      "
      >
        {title}
      </h2>

      <p className="text-muted">
        {description}
      </p>

    </div>
  )
}