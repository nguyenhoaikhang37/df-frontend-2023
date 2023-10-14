'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PasswordStrengthBar from 'react-password-strength-bar'
import * as yup from 'yup'
import { LoginRequest } from '../../generated/model'
import { RouterPaths } from '../../utils/constants'
import { getErrorMessage } from '../../utils/functions'
import { Button } from '../common'
import { TextFieldWithLabel } from '../form'

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.{8,})[a-zA-Z0-9!@#$%^&*()_+]*$/

const defaultValues: LoginRequest = {
  email: '',
  password: '',
}

interface SignInFormProps {
  onSubmit?: (payload: LoginRequest) => void
}

const PASSWORD_STRONG_SCORE = 2

const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const router = useRouter()

  const [passwordScore, setPasswordScore] = useState<number>()
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        return (passwordScore ?? 1) > PASSWORD_STRONG_SCORE
      }),
  })

  const { watch, control, handleSubmit } = useForm<LoginRequest>({
    defaultValues,
    resolver: yupResolver(authSchema),
  })

  const password = watch('password')

  const handleLoginSubmit = async (payload: LoginRequest) => {
    try {
      setIsSubmitting(true)
      await onSubmit?.(payload)
      router.push(RouterPaths.BOOK)
    } catch (error: unknown) {
      const message = getErrorMessage(error)
      setErrorMsg(message)
    } finally {
      setIsSubmitting(false)
    }
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
      <div>
        {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
      </div>
      <div className="mt-6 flex justify-end">
        <Button className="w-full" type="submit" loading={isSubmitting}>
          Login
        </Button>
      </div>
    </form>
  )
}

export default SignInForm
