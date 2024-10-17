import Link from 'next/link'
import React from 'react'

const Appbar = () => {
    return (

        <div className='mx-auto p-4  bg-gradient-to-br from-purple-100 to-indigo-100'>
            <Link href={"/"}>
                <h1 className='text-2xl md:text-3xl font-bold text-purple-600 border-b-2 border-slate-300 p-3 mb-3'>TE Assignment 2024</h1>

            </Link>
        </div>
    )
}

export default Appbar