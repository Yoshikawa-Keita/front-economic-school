type EditableToggleButtonProps = {
  isActive: boolean
  onToggle: () => void
  id: string
}

const EditableToggleButton = ({
  isActive,
  onToggle,
  id,
}: EditableToggleButtonProps) => {
  return (
    <div
      className={`relative inline-block w-10 align-middle select-none transition duration-200 ease-in`}
      onClick={(event) => {
        onToggle()
      }}
    >
      <input
        type="checkbox"
        name="toggle"
        id={id}
        className="hidden"
        checked={isActive}
        onChange={onToggle}
      />
      <label
        htmlFor={id}
        className={`block h-6 overflow-hidden rounded-full cursor-pointer transition-colors duration-200 ease-in ${
          isActive ? 'bg-blue-400' : 'bg-gray-200'
        }`}
      >
        <span
          className={`dot absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in ${
            isActive ? 'translate-x-4' : 'translate-x-0'
          }`}
        ></span>
      </label>
    </div>
  )
}

export default EditableToggleButton
