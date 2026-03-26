"use client"

import { useRef, useState, type MouseEvent } from "react"

import { ArrowUpRightIcon, CheckIcon, ChevronDownIcon, PaperclipIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"

const models = [
  {
    id: 1,
    src: "https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-94.png",
    name: "Gemini 3",
  },
  {
    id: 2,
    src: "https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-96.png",
    name: "GPT-5-mini",
  },
  {
    id: 3,
    src: "https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-95.png",
    name: "Claude 4.5 Sonnet",
  },
]

const BuildThings = () => {
  const [inputValue, setInputValue] = useState("")
  const [selectedModel, setSelectedModel] = useState(models[1])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()

      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="group relative flex min-h-75 items-center justify-center overflow-hidden p-6"
    >
      <img
        src="https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-59.png"
        alt="Build Things"
        className="absolute inset-0 -z-1 h-full object-cover opacity-0 transition-opacity group-hover:opacity-100 dark:hidden"
        style={{
          maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
        }}
      />
      <img
        src="https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-59-dark.png"
        alt="Build Things"
        className="absolute inset-0 -z-1 hidden h-full object-cover opacity-0 transition-opacity group-hover:opacity-100 dark:inline-block"
        style={{
          maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
        }}
      />
      <div className="group/prompt relative flex w-full max-w-121 flex-col gap-8 rounded-xl border shadow-md">
        <Textarea
          id="text-prompt"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What can i do for you?"
          className="field-sizing-content max-h-30 min-h-31.5 !bg-background resize-none rounded-xl border-0 p-4 !text-lg shadow-none focus-visible:ring-0"
        />
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <img src={selectedModel.src} alt={selectedModel.name} className="size-4.5" />
                  <span>{selectedModel.name}</span>
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-50">
                {models.map((model) => (
                  <DropdownMenuItem key={model.id} onClick={() => setSelectedModel(model)}>
                    <div className="flex items-center gap-2">
                      <img src={model.src} alt={model.name} className="size-4.5" />
                      <span>{model.name}</span>
                    </div>
                    {selectedModel.id === model.id && <CheckIcon className="ml-auto" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="bg-border h-5 w-px" />
            <Button
              size="icon"
              className="!size-7 bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40"
            >
              <PaperclipIcon />
              <span className="sr-only">Attach a file</span>
            </Button>
          </div>
          <Button size="icon" className="!size-7" disabled={inputValue.trim() === ""}>
            <ArrowUpRightIcon />
            <span className="sr-only">Open in new tab</span>
          </Button>
        </div>
      </div>

      <div className="from-card pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b to-transparent" />
      <div className="from-card pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent" />
      <div className="from-card pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t to-transparent" />
      <div className="from-card pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r to-transparent" />
    </div>
  )
}

export default BuildThings
