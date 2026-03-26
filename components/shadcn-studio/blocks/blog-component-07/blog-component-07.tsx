import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'

type AreaCard = {
  href: string
  title: string
  description: string
  status: 'in-progress' | 'placeholder'
  tags: string[]
}

type SidebarArea = {
  href: string
  title: string
  description: string
  status: 'in-progress' | 'placeholder'
  tags: string[]
}

const LabAreas = ({
  mainAreas,
  sidebarAreas,
}: {
  mainAreas: AreaCard[]
  sidebarAreas: SidebarArea[]
}) => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-2">
          {mainAreas.map((area) => {
            const isClickable = area.status === 'in-progress'
            return (
              <Link
                key={area.href}
                href={area.href}
                className={isClickable ? '' : 'pointer-events-none'}
                aria-disabled={!isClickable}
                tabIndex={isClickable ? 0 : -1}
              >
                <Card
                  className={[
                    'group h-full shadow-none transition-all duration-150',
                    isClickable
                      ? 'border-cb-border bg-cb-surface-3 hover:border-cb-border-visible hover:bg-cb-surface-4 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_oklch(0_0_0_/_40%)]'
                      : 'border-cb-border-subtle bg-cb-surface-2 opacity-60',
                  ].join(' ')}
                >
                  <CardContent className="flex h-full flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-cb-foreground group-hover:text-foreground transition-colors">
                        {area.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={
                          area.status === 'in-progress'
                            ? 'border-cb-accent/40 bg-cb-accent/10 text-cb-accent text-[9px] uppercase tracking-wider'
                            : 'border-cb-border text-cb-foreground-disabled text-[9px] uppercase tracking-wider'
                        }
                      >
                        {area.status === 'in-progress' ? 'In Progress' : 'Coming Soon'}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs text-cb-foreground-muted leading-relaxed">
                      {area.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-wrap gap-1.5">
                      {area.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] rounded px-1.5 py-0.5 bg-cb-surface-5 text-cb-foreground-disabled font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            )
          })}
        </div>

        <div>
          <div className="flex h-full flex-col gap-4">
            <h3 className="text-sm font-semibold text-cb-foreground uppercase tracking-widest">
              Coming Up
            </h3>
            {sidebarAreas.map((area) => {
              const isClickable = area.status === 'in-progress'
              return (
                <Link
                  key={area.href}
                  href={area.href}
                  className={isClickable ? '' : 'pointer-events-none'}
                  aria-disabled={!isClickable}
                  tabIndex={isClickable ? 0 : -1}
                >
                  <Card
                    className={[
                      'group shadow-none transition-all duration-150',
                      isClickable
                        ? 'border-cb-border bg-cb-surface-3 hover:border-cb-border-visible hover:bg-cb-surface-4'
                        : 'border-cb-border-subtle bg-cb-surface-2 opacity-60',
                    ].join(' ')}
                  >
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium text-cb-foreground">
                            {area.title}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className={
                              area.status === 'in-progress'
                                ? 'border-cb-accent/40 bg-cb-accent/10 text-cb-accent text-[9px] uppercase tracking-wider'
                                : 'border-cb-border text-cb-foreground-disabled text-[9px] uppercase tracking-wider'
                            }
                          >
                            {area.status === 'in-progress' ? 'In Progress' : 'Coming Soon'}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs text-cb-foreground-muted leading-relaxed">
                          {area.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {area.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] rounded px-1.5 py-0.5 bg-cb-surface-5 text-cb-foreground-disabled font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LabAreas
