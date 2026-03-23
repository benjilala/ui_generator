"use client"

import * as React from "react"

import { SidebarNav } from "@/components/blocks/sidebar-nav"

export function CasinoAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <SidebarNav
        defaultTab="casino"
        defaultQuickLink="For you"
        surface={1}
        className="fixed left-0 top-12 z-30 h-[calc(100dvh-3rem)] w-[280px] max-w-[280px] border-r border-cb-border-subtle"
      />
      <main className="ml-[280px] flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-y-contain bg-cb-surface-1">
        <div className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
