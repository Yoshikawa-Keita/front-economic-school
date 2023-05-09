import { useGlobalSpinnerContext } from '@/contexts/GlobalSpinnerContext'

/**
 * グローバルスピナー
 */
const GlobalSpinner = () => {
  const isGlobalSpinnerOn = useGlobalSpinnerContext()

  return (
    <>
      {isGlobalSpinnerOn && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white bg-opacity-40 flex justify-center items-center z-50">
          {/* <Spinner isAutoCentering={true} /> */}
        </div>
      )}
    </>
  )
}

export default GlobalSpinner
