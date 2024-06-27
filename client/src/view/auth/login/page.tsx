/* */
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

/* */
import { useLoginUser } from 'src/api/hooks/useAuth'
import useToast from 'src/components/shared/ui/toast/use-toast'
import { isValidEmail, isValidPassword } from 'src/utils/utils'
import DefaultWidthComponent from 'src/components/shared/ui/DefaultWidth'

const LoginPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { mutate, isPending, data, error, reset } = useLoginUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isValidEmail(email)) {
      toast({
        title: 'Uh oh! Something went wrong',
        description: 'Enter a valid email address',
        variant: 'error',
      })
      reset()
      return
    }
    if (!isValidPassword(password)) {
      toast({
        title: 'Uh oh! Something went wrong',
        description:
          'Password must contain at least 1 number (0-9), 1 uppercase and lowercase letter, 1 special character. Must be at least 8 characters',
        variant: 'error',
      })
      reset()
      return
    }

    mutate({ email, password })
  }

  useEffect(() => {
    if (error) {
      toast({
        title: 'Uh oh! Something went wrong',
        description: 'Incorrect email/password',
        variant: 'error',
      })
      reset()
    }
    if (data) {
      toast({
        title: 'Logged in successfully',
        variant: 'success',
      })
      reset()

      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    }
  }, [data, error, navigate, reset, toast])

  return (
    <section className="w-full py-10">
      <DefaultWidthComponent>
        <div className="w-full max-w-[800px] mx-auto px-5 lg:px-0">
          <div className="font-rethink-sans">
            <h3 className="text-3xl font-medium">Welcome back!</h3>
            <p className="text-sm font-light">
              Don&rsquo;t have an account?{' '}
              <Link
                to={'/auth/register'}
                className="font-semibold hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>

          {/*  */}
          <form
            onSubmit={handleFormSubmit}
            className="w-full flex flex-col items-start justify-start gap-y-5 pt-7"
          >
            {/*  */}
            <div className="w-full">
              <label
                htmlFor="email"
                className="font-rethink-sans text-sm text-zinc-600 font-normal"
              >
                Email
              </label>

              <div className="mt-2 w-full">
                <input
                  required
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="johndoe@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 px-3 rounded-lg border border-gray-300 outline-none focus:outline-none font-rethink-sans text-sm"
                />
              </div>
            </div>

            {/*  */}
            <div className="w-full">
              <div className="flex flex-row items-center justify-between">
                <label
                  htmlFor="password"
                  className="font-rethink-sans text-sm text-zinc-600 font-normal"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="font-rethink-sans text-sm text-[#666666] flex items-center gap-1 pr-1"
                  onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                >
                  {passwordIsVisible ? (
                    <>
                      <FaRegEyeSlash />
                      <p>Hide</p>
                    </>
                  ) : (
                    <>
                      <FaRegEye />
                      <p>Show</p>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-2 w-full">
                <input
                  required
                  id="password"
                  name="password"
                  value={password}
                  placeholder="*****"
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordIsVisible ? 'text' : 'password'}
                  className="w-full py-3 px-3 rounded-lg border border-gray-300 outline-none focus:outline-none font-rethink-sans text-sm"
                />
              </div>
            </div>

            <div className="w-full flex flex-col space-y-2 mt-2">
              {/*  */}
              <button
                type="submit"
                disabled={isPending}
                className={clsx([
                  'w-fit py-4 px-7 rounded-full bg-[#111111] duration-200',
                  {
                    'opacity-60 hover:opacity-80': !isPending,
                    'opacity-80': isPending,
                  },
                ])}
              >
                <span className="font-rethink-sans text-base text-white">
                  {isPending ? 'Loading...' : 'Log in'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </DefaultWidthComponent>
    </section>
  )
}

export default LoginPage
