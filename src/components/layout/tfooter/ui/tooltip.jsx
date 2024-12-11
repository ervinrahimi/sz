'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = React.forwardRef(({ ...props }, ref) => (
  <TooltipPrimitive.Root>
    <TooltipPrimitive.Trigger ref={ref} {...props} />
    <TooltipPrimitive.Content
      sideOffset={4}
      className="z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
    >
      {props.content}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Root>
))
Tooltip.displayName = 'Tooltip'

export { Tooltip, TooltipProvider }
