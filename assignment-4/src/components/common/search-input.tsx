import * as React from 'react'
import { cn } from '../../utils/functions'
import { TextField } from '../form'
import Icon from './icon'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <Icon
          name="search"
          className="absolute bottom-0 left-3 top-0 my-auto h-6 w-6 text-gray-500"
        />
        <TextField
          type={type}
          className={cn('pl-11', className)}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
SearchInput.displayName = 'SearchInput'

export default SearchInput
