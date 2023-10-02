import React from 'react'
import { Label } from '../common'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../common/select'

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[]
  label: string
}

function SelectField({ options, name, label }: SelectFieldProps) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Select name={name}>
        <SelectTrigger id={name}>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

export default SelectField
