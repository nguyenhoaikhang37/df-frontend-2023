'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PasswordStrengthBar from 'react-password-strength-bar'
import * as yup from 'yup'
import { LoginPayload } from '../../types'
import { Button } from '../common'
import { TextFieldWithLabel } from '../form'

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.{8,})[a-zA-Z0-9!@#$%^&*()_+]*$/

const defaultValues: LoginPayload = {
  email: '',
  password: '',
}

interface SignInFormProps {
  onSubmit?: (payload: LoginPayload) => void
}

const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const [passwordScore, setPasswordScore] = useState<number>()

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
      )
      .test('passwordScore', 'Password must be enough strong', () => {
        return (passwordScore ?? 1) >= 4
      }),
  })

  const {
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues,
    resolver: yupResolver(authSchema),
  })

  const password = watch('password')

  async function handleLoginSubmit(payload: LoginPayload) {
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
        <div className="mt-2">
          <PasswordStrengthBar
            password={password}
            onChangeScore={setPasswordScore}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          className="w-full"
          type="submit"
          loading={isSubmitting}
          // disabled={(passwordScore ?? 1) < 4}
        >
          Login
        </Button>
      </div>
    </form>
  )
}

export default SignInForm
