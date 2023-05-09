import SuccessCheckmark from '@/components/SuccessCheckmark';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
//import { verifySecretCode, confirmEmailVerification } from '../api/auth';
import 'tailwindcss/tailwind.css';

const VerifyEmail = () => {
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const secretCode = router.query.secret_code;
      if (!secretCode) return;

      try {
        //await verifySecretCode(secretCode as string);
        setVerificationStatus('success');

        //await confirmEmailVerification(secretCode as string);
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
      } catch (error) {
        setVerificationStatus('failed');
      }
    };

    verifyEmail();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {verificationStatus === 'success' && <SuccessCheckmark />}
      {verificationStatus === 'failed' && (
        <div className="text-red-500 text-lg font-semibold">
          認証に失敗しました。リンクが無効か期限切れです。
        </div>
      )}
    </div>
  );

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       {verificationStatus === 'success' && (
//         <div className="text-green-500 text-lg font-semibold">
//           認証が完了しました！ログイン画面にリダイレクトします。
//         </div>
//       )}
//       {verificationStatus === 'failed' && (
//         <div className="text-red-500 text-lg font-semibold">
//           認証に失敗しました。リンクが無効か期限切れです。
//         </div>
//       )}
//     </div>
//   );
};

export default VerifyEmail;
