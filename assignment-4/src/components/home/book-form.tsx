import React from 'react'
import { GENRES } from '../../utils/functions'
import { Button } from '../common'
import { SelectField, TextFieldWithLabel } from '../form'

interface BookFormProps {
  errorMsg: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const BookForm = ({ errorMsg, onSubmit }: BookFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e)
      }}
    >
      <div className="mb-3">
        <TextFieldWithLabel
          autoFocus
          name="title"
          placeholder="Enter book name"
        />
      </div>
      <div className="mb-3">
        <TextFieldWithLabel name="author" placeholder="Enter book author" />
      </div>
      <div className="mb-3">
        <SelectField label="Genre" name="genre" options={GENRES} />
      </div>
      <div className="text-sm text-red-600">{errorMsg}</div>
      <div className="flex justify-end">
        <Button type="submit">Create</Button>
      </div>
    </form>
  )
}

export default BookForm
