'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button } from '../common'
import { TextFieldWithLabel } from '../form'

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.{8,})[a-zA-Z0-9!@#$%^&*()_+]*$/

const authSchema = yup.object({
  email: yup
    .string()
    .required('Please enter email')
    .email('Please enter a valid email'),

  password: yup
    .string()
    .required('Please enter password')
    .matches(
      passwordRegex,
      'Password must be minimum of 8 characters with at least 1 uppercase and 1 symbol',
    ),
})

export type AuthSchema = yup.InferType<typeof authSchema>

const defaultValues: AuthSchema = {
  email: '',
  password: '',
}

interface SignInFormProps {
  onSubmit?: (payload: AuthSchema) => void
}

const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AuthSchema>({
    defaultValues,
    resolver: yupResolver(authSchema),
  })

  async function handleLoginSubmit(payload: AuthSchema) {
    await onSubmit?.(payload)
  }

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <div className="mb-3">
        <TextFieldWithLabel
          autoFocus
          name="email"
          placeholder="Enter your email"
          control={control}
        />
      </div>
      <div className="mb-3">
        <TextFieldWithLabel
          name="password"
          type="password"
          placeholder="Enter your password"
          control={control}
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button type="submit" loading={isSubmitting} className="w-full">
          Login
        </Button>
      </div>
    </form>
  )
}

export default SignInForm
