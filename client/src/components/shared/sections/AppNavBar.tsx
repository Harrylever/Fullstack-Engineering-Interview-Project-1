import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fade as Hamburger } from 'hamburger-react'

/* */
import DefaultWidthComponent from 'src/components/shared/ui/DefaultWidth'
import { useAuthContext } from 'src/tools/context/authContext/AuthContext'
import { axiosInstance } from 'src/api/constants'
import useToast from '../ui/toast/use-toast'

const AppNavBar = () => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

  const { cred: credentials } = useAuthContext()

  return (
    <header className="w-full bg-ui-white-4 shadow-lg px-3 xl:px-0">
      <DefaultWidthComponent>
        <nav className="w-full flex flex-row items-center justify-between py-5">
          <div className="font-rethink-sans flex flex-col space-y-0.5">
            <h2 className="text-2xl">Ukanah Dean Onesi</h2>
            <p className="text-xs">Full Stack Engineer Assessment</p>
          </div>

          <div className="relative">
            {credentials ? (
              <UserIconComponent
                toggled={mobileMenuIsOpen}
                onToggle={setMobileMenuIsOpen}
              />
            ) : (
              <Hamburger
                size={28}
                toggled={mobileMenuIsOpen}
                onToggle={setMobileMenuIsOpen}
              />
            )}

            {/*  */}
            {mobileMenuIsOpen && (
              <NormalMenuComponent
                setMobileMenuIsOpen={(value) => setMobileMenuIsOpen(value)}
              />
            )}
          </div>
        </nav>
      </DefaultWidthComponent>
    </header>
  )
}

const UserIconComponent = ({
  toggled,
  onToggle,
}: {
  toggled: boolean
  onToggle: (value: boolean) => void
}) => {
  return (
    <button type="button" onClick={() => onToggle(!toggled)}>
      <img
        src="https://www.svgrepo.com/show/126877/avatar.svg"
        alt="User"
        className="w-[40px] h-auto rounded-full"
      />
    </button>
  )
}

interface INormalMenuComponentProps {
  setMobileMenuIsOpen: (value: boolean) => void
}

const NormalMenuComponent: React.FC<INormalMenuComponentProps> = ({
  setMobileMenuIsOpen,
}) => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { cred: credentials, handleSetAuth } = useAuthContext()

  const handleButtonClick = (location: string) => {
    setMobileMenuIsOpen(false)
    navigate(location)
  }

  const handleLogOut = async () => {
    try {
      const response = await axiosInstance.get('auth/logout')
      return response.data
    } catch (err) {
      toast({
        title: 'Error logging out',
        variant: 'error',
      })
    }
  }

  const logOutClick = async () => {
    const response = await handleLogOut()
    if (response && response.success) {
      handleSetAuth(undefined)
      navigate('/')
    }
  }

  return (
    <div className="absolute top-[125%] right-0 2xl:left-1/2 2xl:-translate-x-1/2 w-[230px] bg-white shadow-lg duration-300">
      {credentials ? (
        <>
          <div className="w-full">
            <button
              type="button"
              onClick={logOutClick}
              className="w-full py-2.5 px-3 text-base font-rethink-sans text-left hover:bg-gray-200 duration-300"
            >
              Log out
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full">
            <button
              type="button"
              onClick={() => handleButtonClick('/')}
              className="w-full py-2.5 px-3 text-base font-rethink-sans text-left hover:bg-gray-200 duration-300"
            >
              Home
            </button>
          </div>
          <div className="w-full">
            <button
              type="button"
              onClick={() => handleButtonClick('auth/login')}
              className="w-full py-2.5 px-3 text-base font-rethink-sans text-left hover:bg-gray-200 duration-300"
            >
              Login
            </button>
          </div>
          <div className="w-full">
            <button
              type="button"
              onClick={() => handleButtonClick('auth/register')}
              className="w-full py-2.5 px-3 text-base font-rethink-sans text-left hover:bg-gray-200 duration-300"
            >
              Register
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default AppNavBar
