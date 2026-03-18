"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ThemePreview() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Preview card</CardTitle>
          <CardDescription>See how your theme looks across common patterns.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <Label htmlFor="preview-input">Email address</Label>
            <Input id="preview-input" placeholder="you@example.com" />
          </div>
          <div className="flex items-center gap-3">
            <Switch id="preview-switch" />
            <Label htmlFor="preview-switch">Enable notifications</Label>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">Surface tokens</span>
          <div className="grid grid-cols-4 gap-1.5">
            {["bg-background", "bg-card", "bg-muted", "bg-accent"].map((cls) => (
              <div key={cls} className={`${cls} h-10 rounded border border-border`} title={cls} />
            ))}
          </div>
          <div className="flex gap-2 text-[10px] text-muted-foreground">
            <span>background</span><span>card</span><span>muted</span><span>accent</span>
          </div>
        </Card>
        <Card className="p-4 flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">Text tokens</span>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-foreground">Foreground text</p>
            <p className="text-sm text-muted-foreground">Muted foreground</p>
            <p className="text-sm text-primary">Primary text</p>
            <p className="text-sm text-accent-foreground">Accent foreground</p>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <span className="text-xs font-medium text-muted-foreground mb-2 block">Button variants</span>
        <div className="flex flex-wrap gap-2">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="secondary">Secondary</Button>
          <Button size="sm" variant="destructive">Destructive</Button>
          <Button size="sm" variant="outline">Outline</Button>
          <Button size="sm" variant="ghost">Ghost</Button>
          <Button size="sm" variant="link">Link</Button>
        </div>
      </Card>
    </div>
  )
}
