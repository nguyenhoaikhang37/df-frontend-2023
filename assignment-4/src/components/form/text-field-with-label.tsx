import * as React from 'react'
import { Label } from '../common'
import TextField from './text-field'
import { capitalizeFirstLetter } from '../../utils/functions'

export interface TextFieldWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextFieldWithLabel = React.forwardRef<
  HTMLInputElement,
  TextFieldWithLabelProps
>(({ name, ...props }, ref) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{capitalizeFirstLetter(name!)}</Label>
      <TextField id={name} ref={ref} {...props} />
    </div>
  )
})

TextFieldWithLabel.displayName = 'TextFieldWithLabel'

export default TextFieldWithLabel
