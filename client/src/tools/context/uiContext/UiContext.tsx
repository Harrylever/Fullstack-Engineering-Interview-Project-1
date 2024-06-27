/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

interface UiContextType {
  toastTitle?: string
  toastIsActive?: boolean
  toastDescription?: string
  handleSetToast: (props: {
    title: string
    description?: string
    variant?: 'success' | 'error'
  }) => void
  toastVariant?: 'success' | 'error'
  handleSetToastDisplay: (value: boolean) => void
}

export const UiContext = createContext<UiContextType | undefined>(undefined)

interface UiProviderProps {
  children: React.ReactNode
}

const UiProvider: React.FC<UiProviderProps> = ({ children }) => {
  const [toastTitle, setToastTitle] = useState('')
  const [toastIsActive, setToastIsActive] = useState(false)
  const [toastDescription, setToastDescription] = useState('')
  const [toastVariant, setToastVariant] = useState<
    'success' | 'error' | undefined
  >(undefined)

  const handleSetToastDisplay = (value: boolean) => {
    setToastIsActive(value)
  }

  const handleSetToast = ({
    title,
    variant,
    description,
  }: {
    title: string
    description?: string
    variant?: 'success' | 'error'
  }) => {
    setToastTitle(title)
    setToastDescription(description ? description : '')
    setToastVariant(variant)
  }

  return (
    <UiContext.Provider
      value={{
        toastTitle,
        toastVariant,
        toastIsActive,
        handleSetToast,
        toastDescription,
        handleSetToastDisplay,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}

export const useUiContext = () => {
  const context = useContext(UiContext)

  if (!context) {
    throw new Error('Ui Context must be used within Ui Context Provider')
  }
  return context
}

export default UiProvider
