import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DefaultWidthComponent from 'src/components/shared/ui/DefaultWidth'

const FooterComponent = () => {
  const location = useLocation()
  const [docBodyHeight, setDocBodyHeight] = useState(0)
  const [windowInnerHeight, setWindowInnerHeight] = useState(0)
  const [fullDescriptionIsDisplayed, setFullDescriptionIsDisplayed] =
    useState(false)

  useEffect(() => {
    const getWindowInnerHeight = window.innerHeight
    const getDocBody = document.getElementById('top-section')
    if (!getDocBody) return
    const getDocBodyHeight = getDocBody.offsetHeight

    setDocBodyHeight(getDocBodyHeight)
    setWindowInnerHeight(getWindowInnerHeight)
  }, [location.pathname])

  return (
    <footer
      className={clsx([
        'w-full bg-ui-white-4 py-10 px-5 xl:px-0',
        {
          'fixed bottom-0': docBodyHeight < windowInnerHeight * 0.8,
          'relative top-0': docBodyHeight >= windowInnerHeight * 0.8,
        },
      ])}
    >
      <DefaultWidthComponent>
        <nav className="w-full flex flex-col items-start justify-start gap-y-3">
          <div className="font-rethink-sans max-w-[550px] lg:max-w-none">
            <h3 className="text-4xl font-medium">
              Full Stack Engineer Assessment Project
            </h3>
            <p className="mt-1">
              This is an assessment project. Implementing a Proof of concept of
              a Cookie-based authentication system.{' '}
              {fullDescriptionIsDisplayed
                ? ' The application is designed to share the cookie with subdomain apps. For instance, if the application is deployed at https://example.com, then https://sub.example.com should be capable of accessing and using the same cookie. '
                : null}
              <span
                className="cursor-pointer hover:underline font-medium"
                onClick={() =>
                  setFullDescriptionIsDisplayed(!fullDescriptionIsDisplayed)
                }
              >
                {fullDescriptionIsDisplayed ? 'Less' : 'More'}
              </span>
            </p>
          </div>
        </nav>
      </DefaultWidthComponent>
    </footer>
  )
}

export default FooterComponent
