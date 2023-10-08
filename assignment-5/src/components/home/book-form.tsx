import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Book } from '../../types'
import { GENRES } from '../../utils/functions'
import { Button } from '../common'
import { SelectField, TextFieldWithLabel } from '../form'

const bookSchema = yup.object({
  title: yup
    .string()
    .required('Please enter title')
    .min(5, 'Title is required to have at least 5 characters'),

  author: yup
    .string()
    .required('Please enter author')
    .matches(/^[^0-9]*$/, 'Author name must contain only letters and spaces'),

  genre: yup.string().required('Please enter genre').oneOf(GENRES),
})

export type BookSchema = yup.InferType<typeof bookSchema>

const defaultValues: BookSchema = {
  title: '',
  author: '',
  genre: '',
}

interface BookFormProps {
  formValues?: Book
  isEditForm?: boolean
  onSubmit?: (payload: Book) => void
}

const BookForm = ({ formValues, isEditForm, onSubmit }: BookFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Book>({
    defaultValues: {
      ...defaultValues,
      ...formValues,
    },
    resolver: yupResolver(bookSchema),
  })

  async function handleLoginSubmit(payload: Book) {
    await onSubmit?.(payload)
  }

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <div className="mb-3">
        <TextFieldWithLabel
          autoFocus
          name="title"
          placeholder="Enter book name"
          control={control}
        />
      </div>
      <div className="mb-3">
        <TextFieldWithLabel
          name="author"
          placeholder="Enter book author"
          control={control}
        />
      </div>
      <div className="mb-3">
        <SelectField
          label="Genre"
          name="genre"
          options={GENRES}
          control={control}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          {isEditForm ? 'Edit' : 'Create'}
        </Button>
      </div>
    </form>
  )
}

export default BookForm
