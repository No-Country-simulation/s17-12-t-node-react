'use client'
import { IconBook, IconHome, IconPlusCircle, IconSearch, IconUser } from '@/components/icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const DEFAULT_ROUTES = [
    {
        url: '/',
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
        url: '/',
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
        label: '',
    },
    {
        url: '/perfil',
        icon: <IconUser />,
        label: 'Perfil',
    },
]

export function Footer() {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userId, setUserId] = useState<string | null>('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsAuthenticated(!!token)
        const id = localStorage.getItem('userId')
        setUserId(id)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        setIsAuthenticated(false)
        setUserId(null)
    }

    const routes = isAuthenticated ? AUTH_ROUTES : DEFAULT_ROUTES

    const createAlbumIconStyles = 'flex flex-col items-center rounded-full size-24 justify-center relative -top-10 bg-FondoPrimary ss:size-24'
    const perfilUrl = '/perfil/' + userId

    return (
        <footer className='bg-FondoPrimary sticky bottom-0 left-0 right-0 size text-white rounded-t-2xl py-2 px-2 mt-16 flex justify-between sm:px-6 z-10'>
            {routes.map((route) => (
                <Link key={route.url} href={route.url === '/perfil' ? perfilUrl : route.url} className={`flex flex-col items-center justify-center ${route.url === '/album/create' ? createAlbumIconStyles : ''}`}>
                    {route.icon}
                    <p>{route.label}</p>
                </Link>
            ))}
            {
                isAuthenticated && (
                    <button type='button' onClick={handleLogout} className='text-white flex flex-col items-center justify-center'>
                        <IconUser />
                        <p>Logout</p>
                    </button>
                )
            }
        </footer >
    )
}
