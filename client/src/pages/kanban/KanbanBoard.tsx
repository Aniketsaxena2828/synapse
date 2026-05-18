import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'

import { CSS } from '@dnd-kit/utilities'

import { useEffect, useState } from 'react'

const initialData = {
  todo: [
    {
      id: '1',
      title: 'Design dashboard',
    },
    {
      id: '2',
      title: 'Create auth flow',
    },
  ],

  progress: [
    {
      id: '3',
      title: 'Socket.io integration',
    },
  ],

  completed: [
    {
      id: '4',
      title: 'Project setup',
    },
  ],
}

export default function KanbanBoard() {
  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem('kanban-data')

    return saved ? JSON.parse(saved) : initialData
  })

  const [taskText, setTaskText] = useState('')

  useEffect(() => {
    localStorage.setItem('kanban-data', JSON.stringify(boards))
  }, [boards])

  const sensors = useSensors(useSensor(PointerSensor))

  function addTask() {
    if (!taskText.trim()) return

    const newTask = {
      id: Date.now().toString(),
      title: taskText,
    }

    setBoards((prev: any) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }))

    setTaskText('')
  }

  function deleteTask(column: string, id: string) {
    setBoards((prev: any) => ({
      ...prev,
      [column]: prev[column].filter((task: any) => task.id !== id),
    }))
  }

  function findContainer(id: string) {
    if (boards[id as keyof typeof boards]) return id

    for (const key in boards) {
      const exists = boards[key as keyof typeof boards].find(
        (item: any) => item.id === id
      )

      if (exists) return key
    }

    return null
  }

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (!over) return

    const activeContainer = findContainer(active.id)
    const overContainer = findContainer(over.id)

    if (!activeContainer || !overContainer) return

    if (activeContainer === overContainer) {
      const items = boards[activeContainer as keyof typeof boards]

      const oldIndex = items.findIndex((i: any) => i.id === active.id)
      const newIndex = items.findIndex((i: any) => i.id === over.id)

      setBoards((prev: any) => ({
        ...prev,
        [activeContainer]: arrayMove(items, oldIndex, newIndex),
      }))
    } else {
      const activeItems = [...boards[activeContainer as keyof typeof boards]]
      const overItems = [...boards[overContainer as keyof typeof boards]]

      const activeIndex = activeItems.findIndex(
        (item: any) => item.id === active.id
      )

      const movedItem = activeItems[activeIndex]

      activeItems.splice(activeIndex, 1)
      overItems.push(movedItem)

      setBoards((prev: any) => ({
        ...prev,
        [activeContainer]: activeItems,
        [overContainer]: overItems,
      }))
    }
  }

  return (
    <div className='min-h-screen bg-black text-white p-8'>
      <div className='mb-10'>
        <p className='text-cyan-400 tracking-[6px] mb-2'>KANBAN</p>

        <h1 className='text-6xl font-black mb-4'>Mission Board</h1>

        <p className='text-gray-400 text-xl'>
          Visualize workflow, monitor progress, and track productivity.
        </p>
      </div>

      <div className='flex gap-4 mb-8'>
        <input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder='Enter task'
          className='bg-zinc-900 border border-cyan-500 px-4 py-3 rounded-lg w-[300px] outline-none'
        />

        <button
          onClick={addTask}
          className='bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-lg transition'
        >
          Add Task
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Column
            id='todo'
            title='TODO'
            tasks={boards.todo}
            deleteTask={deleteTask}
          />

          <Column
            id='progress'
            title='IN PROGRESS'
            tasks={boards.progress}
            deleteTask={deleteTask}
          />

          <Column
            id='completed'
            title='COMPLETED'
            tasks={boards.completed}
            deleteTask={deleteTask}
          />
        </div>
      </DndContext>
    </div>
  )
}

function Column({ id, title, tasks, deleteTask }: any) {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      className='border border-cyan-900 bg-[#020617] rounded-xl p-5 min-h-[600px]'
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-3xl font-black'>{title}</h2>

        <div className='bg-cyan-950 border border-cyan-700 text-cyan-300 px-4 py-2 rounded-md'>
          {tasks.length}
        </div>
      </div>

      <SortableContext
        items={tasks.map((task: any) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className='space-y-4 min-h-[500px]'>
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
function TaskCard({ task, columnId, deleteTask }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='bg-zinc-950 border border-cyan-900 rounded-lg p-5'
    >
      <div
        {...attributes}
        {...listeners}
        className='cursor-grab active:cursor-grabbing'
      >
        <p className='text-cyan-400 text-sm mb-3'>TASK</p>

        <h3 className='font-bold text-2xl mb-4'>{task.title}</h3>
      </div>

      <button
        onClick={() => deleteTask(columnId, task.id)}
        className='bg-red-500 hover:bg-red-400 px-3 py-1 rounded text-sm font-bold'
      >
        Delete
      </button>
    </div>
  )
} 