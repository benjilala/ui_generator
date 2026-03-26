import { MotionPreset } from "@/components/ui/motion-preset"

import SecureAccess from "@/components/shadcn-studio/blocks/bento-grid-16/secure-access"
import OneFlowProcess from "@/components/shadcn-studio/blocks/bento-grid-16/one-flow-process"
import PickYourTool from "@/components/shadcn-studio/blocks/bento-grid-16/pick-your-tool"
import BuildThings from "@/components/shadcn-studio/blocks/bento-grid-16/build-things"
import VoiceAssistant from "@/components/shadcn-studio/blocks/bento-grid-16/voice-assistant"

const BentoGrid = () => {
  return (
    <section className="bg-muted py-8 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        <MotionPreset
          fade
          blur
          slide={{ direction: "down", offset: 75 }}
          transition={{ duration: 0.45 }}
          className="bg-card flex flex-col gap-6 overflow-hidden rounded-xl py-6"
        >
          <SecureAccess />
          <div className="space-y-4 px-6">
            <h3 className="text-2xl font-semibold">Secure access</h3>
            <p className="text-muted-foreground text-lg">
              Your information stays encrypted and private, ensuring complete safety while using our AI platform.
            </p>
          </div>
        </MotionPreset>

        <MotionPreset
          fade
          blur
          slide={{ direction: "down", offset: 75 }}
          delay={0.15}
          transition={{ duration: 0.45 }}
          className="bg-card group flex flex-col gap-6 overflow-hidden rounded-xl py-6 max-lg:order-1"
        >
          <PickYourTool />
          <div className="space-y-4 px-6">
            <h3 className="text-2xl font-semibold">Pick your tool</h3>
            <p className="text-muted-foreground text-lg">
              Select from a range of leading AI tools and customize your workspace the way you prefer.
            </p>
          </div>
        </MotionPreset>

        <MotionPreset
          fade
          blur
          slide={{ direction: "down", offset: 75 }}
          delay={0.3}
          transition={{ duration: 0.45 }}
          className="bg-card flex flex-col gap-6 overflow-hidden rounded-xl py-6"
        >
          <OneFlowProcess />
          <div className="space-y-4 px-6">
            <h3 className="text-2xl font-semibold">One-flow process</h3>
            <p className="text-muted-foreground text-lg">
              Conduct deep research seamlessly in a single process, reducing complexity and saving valuable time.
            </p>
          </div>
        </MotionPreset>

        <MotionPreset
          fade
          blur
          slide={{ direction: "down", offset: 75 }}
          delay={0.45}
          transition={{ duration: 0.45 }}
          className="bg-card flex flex-col overflow-hidden rounded-xl pb-6 sm:col-span-2"
        >
          <BuildThings />
          <div className="space-y-4 px-6">
            <h3 className="text-2xl font-semibold">Build things with simple prompt</h3>
            <p className="text-muted-foreground text-lg">
              Turn simple text prompts into powerful outputs, from design to analysis, without extra effort.
            </p>
          </div>
        </MotionPreset>

        <MotionPreset
          fade
          blur
          slide={{ direction: "down", offset: 75 }}
          delay={0.6}
          transition={{ duration: 0.45 }}
          className="bg-card flex flex-col gap-6 overflow-hidden rounded-xl py-6 max-lg:order-1"
        >
          <VoiceAssistant />
          <div className="space-y-4 px-6">
            <h3 className="text-2xl font-semibold">Voice assistant</h3>
            <p className="text-muted-foreground text-lg">Ask, command, and get instant responses.</p>
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}

export default BentoGrid
