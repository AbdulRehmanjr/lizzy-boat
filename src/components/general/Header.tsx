import Image from 'next/image'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className='flex items-center px-5 py-2'>
        <Image src={'/logos/logo_1.png'} alt='Logo' width={130} height={130} />
    </header>
  )
}

export default Header