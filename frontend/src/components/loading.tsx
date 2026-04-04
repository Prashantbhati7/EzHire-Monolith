
"use client"

import { Hourglass } from 'ldrs/react'
import 'ldrs/react/Hourglass.css'
import { useTheme } from 'next-themes'

const Loading = () => {
  const { resolvedTheme } = useTheme()
  const color = resolvedTheme === 'dark' ? 'white' : 'black'

  return (
    <div className="flex-col max-h-screen min-h-[80vh] gap-4 w-full flex items-center justify-center">
      <Hourglass
        size="50"
        bgOpacity="0.1"
        speed="1.75"
        color={color}
      />
    </div>
  )
}

export default Loading
