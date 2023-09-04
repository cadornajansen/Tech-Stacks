import Link from 'next/link';
import Image from 'next/image';

import { ModeToggle } from '../ui/toggle-theme';

const Header = () => {
    return (
        <header className='flex items-center justify-between px-12 md:px-24 py-5'>
            <h1 className='text-2xl font-bold'>Techstacks</h1>
            <ModeToggle />
        </header>
    )
}

export default Header;