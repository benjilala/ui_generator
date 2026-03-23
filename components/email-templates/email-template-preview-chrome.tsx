'use client'

import { motion } from 'motion/react'
import { GameRecsEmailPreview } from '@/components/email-templates/game-recs-email-preview'

const FRAME_WIDTH_TRANSITION = {
  duration: 0.45,
  ease: [0.25, 0.1, 0.25, 1] as const,
}

export function EmailTemplatePreviewFrame({
  frameWidth,
}: {
  frameWidth: number
}) {
  return (
    <div className="flex justify-center overflow-x-auto px-2 pb-10 pt-4">
      <motion.div
        className="@container shrink-0 overflow-hidden rounded-lg border border-cb-border bg-cb-surface-2/30 shadow-inner"
        initial={false}
        animate={{
          width: frameWidth,
        }}
        transition={FRAME_WIDTH_TRANSITION}
        style={{
          maxWidth: '100%',
        }}
      >
        <GameRecsEmailPreview />
      </motion.div>
    </div>
  )
}
