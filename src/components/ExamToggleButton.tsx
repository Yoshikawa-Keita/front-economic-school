import React, { useState } from 'react';
import upsertUserExam, {
  UpsertUserExamParams,
} from '@/services/exam/upsertUserExam';
import { ApiContext } from '@/types';

type ExamToggleButtonProps = {
  username: string;
  examId: number;
  university: string;
  initialIsActive: boolean;
  fetchCompletedExams: () => Promise<void>;
};

const ExamToggleButton: React.FC<ExamToggleButtonProps> = ({
  username,
  examId,
  university,
  initialIsActive,
  fetchCompletedExams,
}) => {
  const [isActive, setIsActive] = useState(initialIsActive);

  const handleToggle = async () => {
    try {
      const params: UpsertUserExamParams = {
        username,
        exam_id: examId,
        university: university,
        is_completed: !isActive,
      };

      // Assume that ApiContext is available globally, for example through a React Context
      const context: ApiContext = {
        apiRootUrl:
          process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
      };

      await upsertUserExam(context, params);
      setIsActive(!isActive);
      // ボタンがトグルされた後に再取得を行う
      // await fetchCompletedExams()
    } catch (error) {
      console.error('Failed to upsert user exam:', error);
    }
  };

  return (
    <div
      className={`relative inline-block w-10 align-middle select-none transition duration-200 ease-in`}
      onClick={handleToggle}
    >
      <input
        type="checkbox"
        name="toggle"
        id={`${username}-${examId}`}
        className="hidden"
        checked={isActive}
        onChange={handleToggle}
      />
      <label
        htmlFor={`${username}-${examId}`}
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
  );
};

export default ExamToggleButton;
