const Separator = ({ space = 0 }: { space: number }) => {
  return (
    <div className="h-5.5 text-gray-300 flex items-center">
      <div className={`flex-1 border-b-1 border-gray-300 mr-${space}`}></div>
      <div className={`flex-1 border-b-1 border-gray-300 ml-${space}`}></div>
    </div>
  )
}

export default Separator
