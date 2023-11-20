import Spinner from '../spinner/Spinner'

export interface IButtonProps {
  label: string
  type: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  isLoading?: boolean
}

const Button = (props: IButtonProps) => {
  const { label, onClick, disabled, isLoading, type } = props

  return (
    <button onClick={onClick} type={type} disabled={disabled} className={`btn`}>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner size={20} containerHeight="max-h-min" />
        </div>
      ) : (
        <p className="text-[#FFF] font-medium font-sans text-base text-center leading-none">
          {label}
        </p>
      )}
    </button>
  )
}

export default Button
