import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import {
  createBook,
  getGetBookKey,
  getGetBooksKey,
  updateBook,
} from '../../generated/book/book'
import {
  Book,
  CreateBookRequest,
  UpdateBookRequest,
} from '../../generated/model'
import { getFilterBookParams } from '../../utils/functions'
import { Button } from '../common'
import { BookForm } from '../home'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'

export interface AddEditBookDialogProps {
  formValues?: Book
}

export default function AddEditBookDialog({
  formValues,
}: AddEditBookDialogProps) {
  const searchParams = useSearchParams()

  const { mutate } = useSWRConfig()

  const [open, setOpen] = useState(false)

  const isEditForm = !!formValues

  const handleSubmit = async (book: CreateBookRequest | UpdateBookRequest) => {
    if (isEditForm) {
      await updateBook(formValues.id, book as UpdateBookRequest).then(() => {
        mutate(getGetBookKey(formValues.id))
        mutate(getGetBooksKey(getFilterBookParams(searchParams)))
      })
    } else {
      createBook(book as CreateBookRequest).then(() => {
        mutate(getGetBooksKey(getFilterBookParams(searchParams)))
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          iconName={isEditForm ? undefined : 'plus'}
          iconPosition="right"
          variant={isEditForm ? 'link' : 'default'}
        >
          {isEditForm ? 'Edit' : 'Add book'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditForm ? 'Edit Book' : 'Add Book'}</DialogTitle>
          <DialogDescription>
            <div className="mt-6">
              <BookForm
                formValues={formValues}
                isEditForm={isEditForm}
                onSubmit={handleSubmit}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
