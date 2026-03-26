'use client'

import * as React from 'react'
import {
  ChevronDown,
  Coins,
  Gift,
  MessageCircle,
  Search,
  User,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export type AppBarHeaderVariant = 'signed-out' | 'signed-in'

export interface AppBarHeaderProps {
  variant: AppBarHeaderVariant
  className?: string
  /** Use surface-1 to match scrolling lobby content (e.g. casino main column). */
  matchContentBackground?: boolean
}

function ChatButton({ dotRingClass }: { dotRingClass: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="relative rounded-full"
          aria-label="Chat"
        >
          <MessageCircle className="size-[18px]" />
          <span
            className={cn(
              'absolute top-1 right-1 size-2 rounded-full bg-orange-500 ring-2',
              dotRingClass,
            )}
            aria-hidden
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Chat</TooltipContent>
    </Tooltip>
  )
}

export function AppBarHeader({
  variant,
  className,
  matchContentBackground = false,
}: AppBarHeaderProps) {
  const signedIn = variant === 'signed-in'
  const dotRingClass = matchContentBackground
    ? 'ring-[var(--cb-surface-1)]'
    : 'ring-[var(--cb-surface-0)]'

  return (
    <TooltipProvider delayDuration={300}>
      <header
        role="banner"
        className={cn(
          'flex h-14 w-full items-center gap-3 border-b border-cb-border px-4 sm:px-6 lg:px-8',
          matchContentBackground ? 'bg-cb-surface-1' : 'bg-cb-surface-0',
          className,
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                className="rounded-full"
                aria-label="Search"
              >
                <Search className="size-[18px]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Search</TooltipContent>
          </Tooltip>
        </div>

        {signedIn && (
          <div className="flex flex-none items-center justify-center gap-2 sm:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="h-10 max-w-[min(100vw-12rem,280px)] rounded-full px-3 font-mono text-xs sm:text-sm"
                >
                  <Coins className="size-4 shrink-0 text-cb-foreground-muted" />
                  <span className="truncate tabular-nums">0.00000000</span>
                  <ChevronDown className="size-4 shrink-0 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuLabel>Wallet</DropdownMenuLabel>
                <DropdownMenuItem>Main balance</DropdownMenuItem>
                <DropdownMenuItem>Sports bonus</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Transaction history</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button type="button" variant="default" size="sm" className="shrink-0">
              Add funds
            </Button>
          </div>
        )}

        <div className="flex flex-none items-center justify-end gap-2 sm:gap-2.5">
          <ChatButton dotRingClass={dotRingClass} />

          {signedIn ? (
            <>
              <Button
                type="button"
                variant="secondary"
                className="hidden h-auto gap-2 rounded-full py-2 pl-3 pr-4 sm:inline-flex"
              >
                <Gift className="size-5 shrink-0 text-cb-purple-50" />
                <span className="flex flex-col items-start gap-0 leading-tight">
                  <span className="text-[13px] font-bold">Rewards</span>
                  <span className="text-[11px] font-normal text-cb-icon-default">
                    Unlock now
                  </span>
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-sm"
                    className="rounded-full"
                    aria-label="Account menu"
                  >
                    <Avatar size="sm" className="size-8 border-0 after:border-cb-border">
                      <AvatarFallback className="bg-cb-surface-3 text-cb-foreground">
                        <User className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button type="button" variant="secondary" size="sm" className="shrink-0">
                Sign in
              </Button>
              <Button type="button" variant="default" size="sm" className="shrink-0">
                Join
              </Button>
            </>
          )}
        </div>
      </header>
    </TooltipProvider>
  )
}
