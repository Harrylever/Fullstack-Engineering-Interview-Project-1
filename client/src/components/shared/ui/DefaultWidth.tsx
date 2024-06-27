interface DefaultWidthComponentProps {
  children: React.ReactNode
}

const DefaultWidthComponent: React.FC<DefaultWidthComponentProps> = ({
  children,
}) => {
  return <div className="w-full mx-auto max-w-7xl">{children}</div>
}

export default DefaultWidthComponent
