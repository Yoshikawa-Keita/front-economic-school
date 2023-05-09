import { useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';

const SuccessCheckmark = () => {
  const [style, set] = useSpring(() => ({
    opacity: 0,
    transform: 'scale(0)',
  }));

  useEffect(() => {
    set({
      opacity: 1,
      transform: 'scale(1)',
      config: config.gentle,
    });
  }, [set]);

  return (
    <div className="text-blue-300 w-24 h-24 animate-bounce">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-full h-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  );

//   return (
//     <animated.div style={style} className="text-green-500">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         className="h-12 w-12"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M5 13l4 4L19 7"
//         />
//       </svg>
//     </animated.div>
//   );
};

export default SuccessCheckmark;
