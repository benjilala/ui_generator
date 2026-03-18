import { InfoIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const PopoverAboutDemo = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon'>
          <InfoIcon />
          <span className='sr-only'>About Shadcn Studio</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-1.5 text-center'>
            <div className='text-lg font-semibold'>About Shadcn Studio</div>
            <p className='text-muted-foreground text-sm'>
              Welcome to Shadcn Studio — your toolkit for building sleek, customizable UI components with ease!
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverAboutDemo
