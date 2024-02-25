import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <>
    <header className='border-b'>
        <div className='flex justify-between max-width padd-x py-2 sm:py-3'>
           <Link href={"/"}><span className='text-cyan-600 text-xl lg:text-2xl'>MediaMate</span></Link>
            <nav>
                <ul className=' gap-8 items-center hidden lg:flex'>
                    <Link href={"/"}><li>Youtube Downloader</li></Link>
                    <Link href={"/"}><li>Facebook Downloader</li></Link>
                    <Link href={"/"}><li>Insta Downloader</li></Link>
                    <Link href={"/"}><li>Tiktok Downloader</li></Link>
                </ul>
            </nav>
        </div>
        </header>
    </>
  )
}

export default Navbar