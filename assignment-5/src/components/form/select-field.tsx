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

interface SelectFieldProps<T extends FieldValues>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[]
  label: string
  name: Path<T>
  control: Control<T>
}

function SelectField<T extends FieldValues>({
  options,
  name,
  label,
  control,
}: SelectFieldProps<T>) {
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
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </>
  )
}

export default SelectField
