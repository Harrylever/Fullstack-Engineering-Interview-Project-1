/* */
import { useCallback } from 'react'
import { useUiContext } from 'src/tools/context/uiContext/UiContext'

const useToast = () => {
  const { handleSetToast, handleSetToastDisplay } = useUiContext()

  const toast = useCallback(
    ({
      title,
      description,
      variant,
    }: {
      title: string
      variant: 'success' | 'error'
      description?: string
    }) => {
      handleSetToast({
        title: title,
        variant: variant,
        description: description,
      })
      handleSetToastDisplay(true)

      setTimeout(() => {
        handleSetToastDisplay(false)
      }, 5000)
    },
    [handleSetToast, handleSetToastDisplay]
  )

  return { toast }
}

export default useToast
