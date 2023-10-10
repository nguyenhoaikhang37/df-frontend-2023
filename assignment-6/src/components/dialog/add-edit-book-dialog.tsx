import { useState } from 'react'
import { Book, BookPayload } from '../../types'
import { useBookSWR } from '../../utils/hooks/apis'
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
  const { onAddBook } = useBookSWR()

  const [open, setOpen] = useState(false)

  const isEditForm = !!formValues

  const handleSubmit = (book: BookPayload) => {
    if (isEditForm) {
      // onEditBook(book)
    } else {
      onAddBook(book)
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
