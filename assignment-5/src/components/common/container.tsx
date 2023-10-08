import * as React from 'react'

export interface ContainerProps {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <div className="mx-auto max-w-7xl px-4">{children}</div>
}
