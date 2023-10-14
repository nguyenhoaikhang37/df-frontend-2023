'use client'

import * as React from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { capitalizeFirstLetter } from '../../utils/functions'
import { Label } from '../common'
import TextField from './text-field'

export interface TextFieldWithLabelProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>
  control: Control<T>
}

const TextFieldWithLabel = <T extends FieldValues>(
  props: TextFieldWithLabelProps<T>,
) => {
  const {
    name,
    control,
    value: externalValue,
    onChange: externalOnChange,

    ...rest
  } = props

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  // render whatever you want: MUI, Ant Design, Bootstrap, Custom UI
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{capitalizeFirstLetter(name!)}</Label>
      <TextField
        id={name}
        ref={ref}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event)
          externalOnChange?.(event)
        }}
        onBlur={onBlur}
        {...rest}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  )
}

TextFieldWithLabel.displayName = 'TextFieldWithLabel'

export default TextFieldWithLabel
