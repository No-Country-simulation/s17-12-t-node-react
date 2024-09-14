'use client'
import { IconBook, IconHome, IconPlusCircle, IconSearch, IconUser } from '@/components/icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const DEFAULT_ROUTES = [
    {
        url: '/feed',
        icon: <IconHome />,
        label: 'Inicio',
    },
    {
        url: '/search',
        icon: <IconSearch />,
        label: 'Buscar',
    },
    {
        url: '/login',
        icon: <IconUser />,
        label: 'Login',
    },
    {
        url: '/register',
        icon: <IconUser />,
        label: 'Registrarse',
    },
]

const AUTH_ROUTES = [
    {
        url: '/feed',
        icon: <IconHome />,
        label: 'Inicio',
    },
    {
        url: '/search',
        icon: <IconSearch />,
        label: 'Buscar',
    },
    {
        url: '/album/create',
        icon: <IconPlusCircle />,
        label: 'Crear álbum',
    },
    {
        url: '/perfil',
        icon: <IconUser />,
        label: 'Perfil',
    },
]

export function Footer() {
    return (
        <footer className='bg-FondoPrimary sticky bottom-0 left-0 right-0 text-white rounded-t-2xl py-2 px-2 mt-16 flex justify-between sm:px-6 z-10'>
            {routes.map((route) => (
                <Link key={route.url} href={route.url === '/perfil' ? perfilUrl : route.url} className={`flex flex-col items-center justify-center ${route.url === '/album/create' ? createAlbumIconStyles : ''}`}>
                    {route.icon}
                    <p>{route.label}</p>
                </Link>

                <Link href={'/album/create'} className="flex flex-col items-center rounded-full  size-[70px] justify-center relative -top-10 bg-FondoPrimary ss:size-24">
                    <IconPlusCircle size={50} />
                    {/* <p className="text-[10px]">Crear album</p> */}
                </Link>

                <Link href={'/perfil/test'} className="flex flex-col items-center justify-center">
                    <IconBook />
                    <p>Wish list</p>
                </Link>
            </div>

            <Link href={"/perfil/william96"} className="flex flex-col items-center justify-center">
                <IconUser />
                <p>Perfil</p>
            </Link>

        </footer >
    )
}
