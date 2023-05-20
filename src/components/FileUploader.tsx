import { ChangeEvent, FC, useState } from 'react'

interface FileUploaderProps {
  onFileSelect: (file: FileList) => void
  message?: string
  accept?: string
}

const FileUploader: FC<FileUploaderProps> = ({ onFileSelect, message, accept }) => {
  const [preview, setPreview] = useState<string | null>(null)

  const fileSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileSelect(event.target.files)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  return (
    <div className="flex flex-col items-start">
      <label
        htmlFor="profileImage"
        className="text-sm font-bold text-gray-700 mb-2"
      >
        プロフィール画像を選択（任意）
      </label>
      <input
        type="file"
        id="profileImage"
        onChange={fileSelectedHandler}
        accept={accept}
        className="mb-2"
      />
      {preview && (
        <img src={preview} alt="File preview" className="max-w-xs mb-2" />
      )}
      <p className="text-xs text-gray-600">{message}</p>
    </div>
  )
}

export default FileUploader
