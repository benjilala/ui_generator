"use client"

import { useEffect, useState, type ReactNode } from "react"

import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"
import { useMedia } from "react-use"
import { ChevronDownIcon, ChevronRightIcon, CircleSmallIcon, MenuIcon } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MatterButton } from "@/components/ui/matter-button"

import { cn } from "@/lib/utils"

import MatterLogo from "@/assets/svg/matter-logo"

type NavigationItem = {
  title: string
  href: string
  icon?: ReactNode
  description?: string
}

type ImageSection = {
  img: string
  href: string
  title: string
  description?: string
}

type Navigation = {
  title: string
  contentClassName?: string
} & (
  | {
      href: string
      items?: never
      subtitle?: never
      imgSubtitle?: never
      imageSection?: never
    }
  | {
      href?: never
      subtitle?: never
      imgSubtitle?: never
      items?: NavigationItem[]
      imageSection?: never
    }
  | {
      href?: never
      subtitle: string
      imgSubtitle: string
      items?: NavigationItem[]
      imageSection: ImageSection
    }
)

const RichNavigationItem = ({ item }: { item: NavigationItem }) => (
  <NavigationMenuLink href={item.href} className="flex gap-2 p-2">
    <div className="flex items-start gap-2">
      {item.icon && (
        <div className="flex size-7 items-center justify-center rounded-sm border bg-background [&_svg]:text-foreground!">
          {item.icon}
        </div>
      )}
      <div className="flex-1 space-y-1">
        <div className="text-sm font-medium text-popover-foreground">{item.title}</div>
        {item.description && <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>}
      </div>
    </div>
  </NavigationMenuLink>
)

const SimpleNavigationItem = ({ item }: { item: NavigationItem }) => (
  <NavigationMenuLink href={item.href} className="block rounded-md p-2">
    {item.title}
  </NavigationMenuLink>
)

const ImageSectionContent = ({ imageSection }: { imageSection: ImageSection }) => (
  <a href={imageSection.href} className="relative block h-full overflow-hidden rounded-md">
    <img src={imageSection.img} alt={imageSection.title} className="h-full w-full rounded-md object-cover" />
    <span className="absolute inset-0 h-full bg-gradient-to-t from-black/60 to-transparent" />
    <div className="absolute bottom-0 p-2 text-white">
      <h3 className="font-medium">{imageSection.title}</h3>
      {imageSection.description && <p className="text-sm text-white/80">{imageSection.description}</p>}
    </div>
  </a>
)

const HeroNavigation = ({ navigationData, className }: { navigationData: Navigation[]; className?: string }) => {
  const hasRichContent = (items?: NavigationItem[]) => items?.some((item) => item.description || item.icon)

  return (
    <div className={cn("flex items-center", className)}>
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="relative flex flex-wrap gap-6 rounded-full border-2 border-background px-7 py-3 outline-1 outline-border before:absolute before:inset-0 before:-z-10 before:size-full before:rounded-full before:bg-neutral-950/5 before:backdrop-blur-sm">
          {navigationData.map((navItem) => {
            if (navItem.href) {
              return (
                <NavigationMenuItem key={navItem.title}>
                  <NavigationMenuLink
                    href={navItem.href}
                    className="group inline-flex w-max items-center justify-center rounded-md bg-transparent p-0 text-base font-medium text-muted-foreground transition-[color,box-shadow] outline-none hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground focus-visible:bg-transparent focus-visible:text-foreground focus-visible:ring-0 data-[active=true]:bg-transparent data-[active=true]:text-foreground data-[active=true]:hover:bg-transparent data-[active=true]:focus:bg-transparent disabled:pointer-events-none disabled:opacity-50"
                  >
                    {navItem.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            }

            const ItemComponent = hasRichContent(navItem.items) ? RichNavigationItem : SimpleNavigationItem
            const spacing = hasRichContent(navItem.items) ? "space-y-2" : "space-y-0.5"

            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuPrimitive.Trigger
                  data-slot="navigation-menu-trigger"
                  className="group inline-flex w-max items-center justify-center rounded-md text-base font-medium text-muted-foreground transition-[color,box-shadow] outline-none hover:text-foreground data-[state=open]:text-foreground focus-visible:text-foreground disabled:pointer-events-none disabled:opacity-50"
                >
                  {navItem.title}
                  <ChevronDownIcon
                    className="relative top-px ml-1 size-4 transition duration-300 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </NavigationMenuPrimitive.Trigger>
                <NavigationMenuContent
                  className={cn(
                    navItem.contentClassName,
                    "shadow-lg! !backdrop-blur-md group-data-[viewport=false]/navigation-menu:left-1/2 group-data-[viewport=false]/navigation-menu:mt-[17px]! group-data-[viewport=false]/navigation-menu:!-translate-x-1/2 group-data-[viewport=false]/navigation-menu:!bg-background/80"
                  )}
                >
                  {navItem.imageSection ? (
                    <div className="grid grid-cols-2 gap-2">
                      <ul className="space-y-2 rounded-md border bg-background p-2">
                        <li className="px-2 text-sm text-muted-foreground">{navItem.subtitle}</li>
                        {navItem.items?.map((item) => (
                          <li key={item.title}>
                            <RichNavigationItem item={item} />
                          </li>
                        ))}
                      </ul>
                      <div className="relative flex h-full flex-col overflow-hidden">
                        <h3 className="mb-2 px-2 text-sm text-muted-foreground">{navItem.imgSubtitle}</h3>
                        <div className="flex-1">
                          <ImageSectionContent imageSection={navItem.imageSection} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ul className={cn("rounded-md border bg-background p-2", spacing)}>
                      {navItem.items?.map((item) => (
                        <li key={item.title}>
                          <ItemComponent item={item} />
                        </li>
                      ))}
                    </ul>
                  )}
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const HeroNavigationSmallScreen = ({
  navigationData,
  triggerClassName,
  screenSize = 1023,
}: {
  navigationData: Navigation[]
  triggerClassName?: string
  screenSize?: number
}) => {
  const [open, setOpen] = useState(false)
  const isMobile = useMedia(`(max-width: ${screenSize}px)`, false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!isMobile) {
      setOpen(false)
    }
  }, [isMobile])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MatterButton size="icon-lg" className={cn("inline-flex lg:hidden", triggerClassName)}>
          <MenuIcon />
          <span className="sr-only">Menu</span>
        </MatterButton>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] gap-0 p-0">
        <SheetHeader className="p-4">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">Main menu</SheetDescription>
          <a href="/" onClick={handleLinkClick} className="self-start">
            <div className="flex items-center gap-3">
              <MatterLogo className="size-8" />
              <span className="font-[Orbitron] text-[1.75rem] leading-[1.625rem] font-bold text-foreground">
                UI Lab
              </span>
            </div>
          </a>
        </SheetHeader>
        <div className="space-y-0.5 overflow-y-auto p-2">
          {navigationData.map((navItem, index) => {
            if (navItem.href) {
              return (
                <a
                  key={navItem.title}
                  href={navItem.href}
                  className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                  onClick={handleLinkClick}
                >
                  {navItem.title}
                </a>
              )
            }

            return (
              <Collapsible key={index} className="w-full">
                <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm hover:bg-accent">
                  <div className="flex items-center gap-2">{navItem.title}</div>
                  <ChevronRightIcon className="size-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  {navItem.items?.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="ml-3 flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                      onClick={handleLinkClick}
                    >
                      {item.icon ? item.icon : <CircleSmallIcon className="size-4" />}
                      {item.title}
                    </a>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { HeroNavigation, HeroNavigationSmallScreen, type Navigation, type NavigationItem, type ImageSection }
