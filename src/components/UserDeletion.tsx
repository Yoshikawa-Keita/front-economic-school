import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import EditableToggleButton from './EditableToggleButton'
import { ApiContext, User } from '@/types'
import deleteUser from '@/services/users/deleteUser'
import ConfirmModal from '@/components/ConfirmModal'
import { toast } from 'react-toastify'

interface UserDeletionProps {
  authUser: User
  onDeactivate?: (error?: Error) => void
}

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

const UserDeletion = ({ authUser, onDeactivate }: UserDeletionProps) => {
  const [showModal, setShowModal] = useState(false)
  const [isDeletionEnabled, setDeletionEnabled] = useState(false) // New state

  const confirmDeactivation = () => {
    if (!isDeletionEnabled) {
      toast.warn('退会前にトグルボタンをオンにしてください。')
      return
    }

    const username = authUser.username

    deleteUser(context, { username })
      .then(() => {
        // On success
        onDeactivate && onDeactivate()
      })
      .catch((err: unknown) => {
        // On error
        if (err instanceof Error) {
          toast.error(err.message)
          onDeactivate && onDeactivate(err)
        }
      })

    setShowModal(false)
    setDeletionEnabled(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mt-8 mb-5">アカウント退会</h1>
      <p className="mb-4">
        退会すると全てのアカウント情報が削除されます。データの復元はできませんのでご注意ください。
      </p>
      <div className="mb-4">
        <EditableToggleButton
          isActive={isDeletionEnabled}
          onToggle={() => setDeletionEnabled((current) => !current)}
          id="deletion-toggle"
        />
      </div>
      <button
        onClick={() => setShowModal(true)}
        disabled={!isDeletionEnabled} // Button is disabled when isDeletionEnabled is false
        className={`${
          isDeletionEnabled
            ? 'bg-red-500 hover:bg-red-700'
            : 'bg-red-500 opacity-50 cursor-not-allowed'
        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      >
        退会する
      </button>
      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDeactivation}
        title="退会確認"
        body="本当にアカウントを退会しますか？全ての情報が削除されます。"
      />
    </div>
  )
}

export default UserDeletion
