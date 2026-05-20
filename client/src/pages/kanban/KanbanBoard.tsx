import {
  DndContext,
  closestCenter,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"

import {
  useEffect,
  useState,
} from "react"

import {
  useParams,
} from "react-router-dom"

import {
  useApp,
} from "../../context/AppContext"

export default function KanbanBoard() {

  const {
    boards,
    setBoards,
  } = useApp()

  const { workspaceId } =
    useParams()

  const [taskText, setTaskText] =
    useState("")

  useEffect(() => {

    if (!workspaceId)
      return

    localStorage.setItem(
      "current-workspace",
      workspaceId
    )

    const saved =
      localStorage.getItem(
        `kanban-${workspaceId}`
      )

    try {

      const parsed = saved
        ? JSON.parse(saved)
        : null

      setBoards(

        parsed || {

          todo: [],

          progress: [],

          completed: [],
        }
      )

    } catch {

      console.log(
        "Invalid localStorage data"
      )

      setBoards({

        todo: [],

        progress: [],

        completed: [],
      })
    }

  }, [workspaceId, setBoards])

  useEffect(() => {

    if (!workspaceId || !boards)
      return

    localStorage.setItem(

      `kanban-${workspaceId}`,

      JSON.stringify(boards)
    )

  }, [
    boards,
    workspaceId,
  ])

  const sensors =
    useSensors(
      useSensor(PointerSensor)
    )

  function addTask() {

    if (!taskText.trim())
      return

    const newTask = {

      id:
        Date.now().toString(),

      title:
        taskText,
    }

    setBoards((prev: any) => ({

      ...(prev || {

        todo: [],
        progress: [],
        completed: [],
      }),

      todo: [
        ...(prev?.todo || []),
        newTask,
      ],

    }))

    setTaskText("")
  }

  function deleteTask(
    column: string,
    id: string
  ) {

    setBoards((prev: any) => ({

      ...prev,

      [column]:
        (prev?.[column] || []).filter(
          (task: any) =>
            task.id !== id
        ),

    }))
  }

  function findContainer(id: string) {

    if (!boards)
      return null

    if (
      boards[
        id as keyof typeof boards
      ]
    ) {
      return id
    }

    for (const key in boards) {

      const exists =
        boards[
          key as keyof typeof boards
        ]?.find(
          (item: any) =>
            item.id === id
        )

      if (exists)
        return key
    }

    return null
  }

  function handleDragEnd(event: any) {

    if (!boards)
      return

    const {
      active,
      over,
    } = event

    if (!over)
      return

    const activeContainer =
      findContainer(active.id)

    const overContainer =
      findContainer(over.id)

    if (
      !activeContainer ||
      !overContainer
    ) {
      return
    }

    if (
      activeContainer ===
      overContainer
    ) {

      const items =
        boards[
          activeContainer as keyof typeof boards
        ] || []

      const oldIndex =
        items.findIndex(
          (i: any) =>
            i.id === active.id
        )

      const newIndex =
        items.findIndex(
          (i: any) =>
            i.id === over.id
        )

      setBoards((prev: any) => ({

        ...prev,

        [activeContainer]:
          arrayMove(
            items,
            oldIndex,
            newIndex
          ),

      }))

    } else {

      const activeItems = [
        ...(boards[
          activeContainer as keyof typeof boards
        ] || []),
      ]

      const overItems = [
        ...(boards[
          overContainer as keyof typeof boards
        ] || []),
      ]

      const activeIndex =
        activeItems.findIndex(
          (item: any) =>
            item.id === active.id
        )

      const movedItem =
        activeItems[activeIndex]

      activeItems.splice(
        activeIndex,
        1
      )

      overItems.push(movedItem)

      setBoards((prev: any) => ({

        ...prev,

        [activeContainer]:
          activeItems,

        [overContainer]:
          overItems,

      }))
    }
  }

  return (

    <div className="
      min-h-screen
      px-10
      py-12
    ">

      <div className="mb-12">

        <p className="
          text-cyan-400
          tracking-[8px]
          mb-3
          text-sm
          font-semibold
        ">
          KANBAN
        </p>

        <h1 className="
          text-7xl
          font-black
          tracking-tight
          mb-5
        ">
          Mission Board
        </h1>

        <p className="
          text-slate-400
          text-2xl
        ">
          Visualize workflow,
          monitor progress,
          and track productivity.
        </p>

      </div>

      <div className="
        flex
        gap-5
        mb-10
        flex-wrap
      ">

        <input
          value={taskText}

          onChange={(e) =>
            setTaskText(
              e.target.value
            )
          }

          placeholder="Enter task"

          className="
            cyber-input
            px-6
            py-4
            rounded-2xl
            w-[360px]
            text-lg
          "
        />

        <button

          onClick={addTask}

          className="
            cyber-button
            px-8
            py-4
            rounded-2xl
            text-black
            font-bold
            text-lg
          "
        >
          Add Task
        </button>

      </div>

      <DndContext

        sensors={sensors}

        collisionDetection={
          closestCenter
        }

        onDragEnd={
          handleDragEnd
        }
      >

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-8
        ">

          <Column
            id="todo"
            title="TODO"
            tasks={boards?.todo || []}
            deleteTask={deleteTask}
          />

          <Column
            id="progress"
            title="IN PROGRESS"
            tasks={boards?.progress || []}
            deleteTask={deleteTask}
          />

          <Column
            id="completed"
            title="COMPLETED"
            tasks={boards?.completed || []}
            deleteTask={deleteTask}
          />

        </div>

      </DndContext>

    </div>
  )
}

function Column({
  id,
  title,
  tasks,
  deleteTask,
}: any) {

  const { setNodeRef } =
    useDroppable({
      id,
    })

  return (

    <div

      ref={setNodeRef}

      className="
        cyber-card
        rounded-3xl
        p-7
        min-h-[650px]
        border
        backdrop-blur-xl
      "
    >

      <div className="
        flex
        justify-between
        items-center
        mb-8
      ">

        <h2 className="
          text-4xl
          font-black
          tracking-tight
        ">
          {title}
        </h2>

        <div className="
          bg-cyan-500/10
          border
          border-cyan-400/20
          text-cyan-300
          px-5
          py-3
          rounded-2xl
          text-lg
          font-bold
        ">

          {tasks.length}

        </div>

      </div>

      <SortableContext

        items={
          tasks.map(
            (task: any) =>
              task.id
          )
        }

        strategy={
          verticalListSortingStrategy
        }
      >

        <div className="
          space-y-5
          min-h-[500px]
        ">

          {tasks.map((task: any) => (

            <TaskCard
              key={task.id}
              task={task}
              columnId={id}
              deleteTask={deleteTask}
            />

          ))}

        </div>

      </SortableContext>

    </div>
  )
}

function TaskCard({
  task,
  columnId,
  deleteTask,
}: any) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task.id,
  })

  const style = {

    transform:
      CSS.Transform.toString(
        transform
      ),

    transition,
  }

  return (

    <div

      ref={setNodeRef}

      style={style}

      className="
        bg-white/5
        border
        border-cyan-400/10
        rounded-2xl
        p-6
        backdrop-blur-md
        hover:border-cyan-400/30
        transition-all
        duration-300
      "
    >

      <div

        {...attributes}
        {...listeners}

        className="
          cursor-grab
          active:cursor-grabbing
        "
      >

        <p className="
          text-cyan-400
          text-sm
          mb-3
          tracking-wide
        ">
          TASK
        </p>

        <h3 className="
          font-bold
          text-3xl
          mb-5
        ">
          {task.title}
        </h3>

      </div>

      <button

        onClick={() =>
          deleteTask(
            columnId,
            task.id
          )
        }

        className="
          mt-2
          px-4
          py-2
          rounded-xl
          bg-rose-500/15
          text-rose-400
          border
          border-rose-400/20
          hover:bg-rose-500/25
          transition-all
        "
      >
        Delete
      </button>

    </div>
  )
}