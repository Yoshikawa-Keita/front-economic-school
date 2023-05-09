import { useState } from 'react';
import { fetcher } from '@/utils'; 
import { useRouter } from 'next/router';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const fileUploadHandler = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
    
      const response = await fetcher('/api/upload', {
        method: 'POST',
        body: formData,
      });
      router.push(`/images/${response.imageId}`);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={fileSelectedHandler} />
      <button onClick={fileUploadHandler}>Upload</button>
    </div>
  );
};

export default FileUploader;
