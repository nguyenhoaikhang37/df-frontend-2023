'use client'

import React from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { Label } from '../common'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../common/select'

type SelectFieldProps<T, K extends FieldValues> = Partial<
  React.SelectHTMLAttributes<HTMLSelectElement>
> & {
  name: Path<K>
  control: Control<K>

  label: string

  options: T[]
  getOptionLabel: (option: T) => string
  getOptionValue: (option: T) => string
}

function SelectField<T, K extends FieldValues>({
  options,
  name,
  label,
  control,
  getOptionLabel,
  getOptionValue,
}: SelectFieldProps<T, K>) {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} onValueChange={onChange} value={value}>
        <SelectTrigger id={name}>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent ref={ref}>
          {options.map((option) => (
            <SelectItem
              key={getOptionValue(option)}
              value={getOptionValue(option)}
            >
              {getOptionLabel(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </>
  )
}

export default SelectField
