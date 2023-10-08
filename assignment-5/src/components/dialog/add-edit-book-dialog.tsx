import { Dispatch, SetStateAction } from 'react'
import { Book } from '../../types'
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
import { BookSchema } from '../home/book-form'

export interface AddEditBookDialogProps {
  formValues?: Book
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onSubmit: (book: Book | BookSchema) => void
}

export default function AddEditBookDialog({
  formValues,
  open,
  setOpen,
  onSubmit,
}: AddEditBookDialogProps) {
  const isEditForm = !!formValues

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
                onSubmit={onSubmit}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
