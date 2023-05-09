import Image from 'next/image'

import Logo from '../../public/images/whale1.png'

const AppLogo = () => {
  return <Image src={Logo} className="rounded w-12 h-12" alt="Logo" />
}

export default AppLogo
