import DefaultWidthComponent from 'src/components/shared/ui/DefaultWidth'
import { useAuthContext } from 'src/tools/context/authContext/AuthContext'

const DashboardPage = () => {
  const { cred: credentials } = useAuthContext()
  return (
    <div className="py-10">
      <DefaultWidthComponent>
        <div className="px-4 xl:px-0">
          <p className="text-3xl font-semibold font-rethink-sans">Dashboard</p>
          <p className="mt-3 text-base font-normal font-rethink-sans">
            You are logged in as{' '}
            <span className="font-medium">{credentials?.email}</span>
          </p>
          <p className="text-gray-500 text-xs font-normal font-rethink-sans">
            Click user icon to log out
          </p>
        </div>
      </DefaultWidthComponent>
    </div>
  )
}

export default DashboardPage
