import { ResourceGroup } from "@/components/patterns/ResourceGroup"
import { LabResourcesHeader } from "@/components/resources/lab-resources-header"
import {
  DESIGN_SYSTEM_RESOURCES,
  PATTERNS_RESOURCES,
  PROMPTS_RESOURCES,
  USEFUL_LINKS_SHADCN_ANIMATIONS,
  USEFUL_LINKS_SHADCN_RESOURCES,
} from "@/lib/lab-catalog"

export const metadata = {
  title: "Resource hub | Cloudbet UI Lab",
  description:
    "Download prompts, token definitions, and pattern guides to audit interfaces and refactor to structured shadcn components.",
}

export default function LabResourcesPage() {
  return (
    <div className="min-h-screen bg-cb-surface-1 flex flex-col">
      <LabResourcesHeader />

      <main className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Download the system. Map the UI. Refactor to shadcn. Ship faster.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-cb-foreground-muted sm:mt-5 sm:text-lg sm:leading-relaxed">
            Download prompts, token definitions, and pattern guides to help audit existing interfaces and
            refactor them into structured shadcn components. Built to support fast iteration, consistent
            patterns, and production-ready output.
          </p>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/55 sm:text-sm">
              Useful links
            </h3>
            <ResourceGroup
              heading="Shadcn resources"
              entries={USEFUL_LINKS_SHADCN_RESOURCES}
            />
            <ResourceGroup
              heading="Shadcn animations"
              entries={USEFUL_LINKS_SHADCN_ANIMATIONS}
            />
          </div>
          <ResourceGroup heading="Design system" entries={DESIGN_SYSTEM_RESOURCES} />
          <ResourceGroup heading="Prompts and agents" entries={PROMPTS_RESOURCES} />
          <ResourceGroup heading="Patterns and generation" entries={PATTERNS_RESOURCES} />
        </div>
      </main>
    </div>
  )
}
