import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
  Book,
  CreateBookRequest,
  UpdateBookRequest,
} from '../../generated/model'
import { useGetTopics } from '../../generated/topic/topic'
import { Button } from '../common'
import { SelectField, TextFieldWithLabel } from '../form'

const bookSchema = yup.object({
  name: yup
    .string()
    .required('Please enter title')
    .min(5, 'Title is required to have at least 5 characters'),

  author: yup
    .string()
    .required('Please enter author')
    .matches(/^[^0-9]*$/, 'Author name must contain only letters and spaces'),

  topicId: yup.string().required('Please enter genre'),
})

export type BookSchema = yup.InferType<typeof bookSchema>

const defaultValues: BookSchema = {
  name: '',
  author: '',
  topicId: '',
}

interface BookFormProps {
  formValues?: Book
  isEditForm?: boolean
  onSubmit?: (book: CreateBookRequest | UpdateBookRequest) => void
}

const BookForm = ({ formValues, isEditForm, onSubmit }: BookFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<BookSchema>({
    defaultValues: {
      ...defaultValues,
      name: formValues?.name ?? defaultValues.name,
      author: formValues?.author ?? defaultValues.author,
      topicId: formValues?.topic?.id?.toString() ?? defaultValues.topicId,
    },
    resolver: yupResolver(bookSchema),
  })

  const { data, isLoading } = useGetTopics()

  async function handleLoginSubmit(payload) {
    await onSubmit?.({ ...payload, topicId: Number(payload.topicId) })
  }

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <div className="mb-3">
        <TextFieldWithLabel
          autoFocus
          name="name"
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
      {!isLoading && (
        <div className="mb-3">
          <SelectField
            label="Genre"
            name="topicId"
            options={
              data?.data?.map((topic) => ({
                label: topic.name,
                value: topic.id?.toString(),
              })) || []
            }
            getOptionValue={(option) => option?.value ?? ''}
            getOptionLabel={(option) => option?.label ?? ''}
            control={control}
          />
        </div>
      )}
      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          {isEditForm ? 'Edit' : 'Create'}
        </Button>
      </div>
    </form>
  )
}

export default BookForm
