export type ResourceEntryStatus = "available" | "planned" | "future"

export interface ResourceEntry {
  title: string
  description: string
  path?: string
  href?: string
  status?: ResourceEntryStatus
}
