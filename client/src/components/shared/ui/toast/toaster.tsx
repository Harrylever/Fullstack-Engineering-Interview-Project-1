/* */
import clsx from 'clsx'
import { MdClose } from 'react-icons/md'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, Target } from 'framer-motion'

/* */
import { useMediaQuery } from 'src/tools/hooks'
import { useUiContext } from 'src/tools/context/uiContext/UiContext'

const Toaster = () => {
  const isSmallScreen = useMediaQuery('(max-width: 640px)')
  const {
    toastTitle,
    toastVariant,
    toastIsActive,
    toastDescription,
    handleSetToastDisplay,
  } = useUiContext()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const calculateX = useCallback(() => {
    return (windowWidth - (windowWidth - windowWidth * 0.12)) / 2
  }, [windowWidth])

  const animate: Target = isSmallScreen
    ? { y: '2vh', x: calculateX(), opacity: 1 }
    : { y: '2vh', x: 'calc(100vw - 440px)', opacity: 1 }

  return (
    <AnimatePresence>
      {toastIsActive && (
        <div className="fixed top-0 left-0 border border-black">
          <motion.div
            key={'modal'}
            initial={{ y: 10, opacity: 0 }}
            animate={animate}
            exit={{ y: 20, opacity: 0 }}
          >
            <div
              style={{
                width: isSmallScreen
                  ? `${windowWidth - windowWidth * 0.12}px`
                  : '420px',
              }}
              className={clsx([
                `absolute py-4 px-3.5 font-rethink-sans font-normal flex flex-col items-start justify-start gap-1 duration-300 rounded-lg`,
                { 'bg-emerald-600 text-white': toastVariant === 'success' },
                { 'bg-red-600 text-white': toastVariant === 'error' },
              ])}
            >
              <div className="w-full flex flex-row items-center justify-between">
                <p className="text-base font-medium">{toastTitle}</p>

                <button
                  type="button"
                  onClick={() => handleSetToastDisplay(false)}
                  className="border w-[25px] h-[25px] flex flex-col items-center justify-center rounded-md"
                >
                  <MdClose className="text-sm" />
                </button>
              </div>
              {toastDescription && toastDescription.length > 0 && (
                <div>
                  <p className="text-sm font-normal">{toastDescription}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Toaster
