interface TaskPreviewCardProps {
  title: string
  priority: string
}

export default function TaskPreviewCard({
  title,
  priority,
}: TaskPreviewCardProps) {
  return (
    <div className="
      bg-background
      border border-border
      rounded-xl
      p-4
      mb-4
      hover:border-primary
      transition-all
      cursor-pointer
    ">
      <span className="
        text-xs
        px-3 py-1
        rounded-full
        bg-primary/20
        text-primary
      ">
        {priority}
      </span>

      <h2 className="mt-4 text-lg font-medium">
        {title}
      </h2>
    </div>
  )
}