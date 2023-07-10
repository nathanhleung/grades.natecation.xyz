"use client";

import { sample } from 'lodash';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { DONORS, UCLA_BLUE_RGB } from "../constants";
import { Search } from './search';

const Navbar = () => {
    const [randomDonor, setRandomDonor] = useState('');
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setRandomDonor(sample(DONORS) ?? '');
    }, [pathname]);

    return (
        <>
            <div className="flex items-center justify-between w-full bg-uclaBlue text-white p-2">
                <div className="flex items-center gap-12">
                    <Link href="/" className="font-bold hover:opacity-50">
                        grades.natecation.xyz
                    </Link>
                    <Link href="/" className="font-semibold hover:opacity-50">
                        Home
                    </Link>
                    <Link href="/about" className="font-semibold hover:opacity-50">
                        About
                    </Link>
                    <div
                        className="font-bold rounded px-4 py-1 bg-white text-black"
                        onClick={() => setSearchModalOpen(true)}
                    >
                        <p className="opacity-50">Search by department</p>
                    </div>
                </div>
                <div>
                    {randomDonor && <Link className="hover:opacity-50" href="/shoutouts">Shoutout to {randomDonor}</Link>}
                </div>
            </div>
            <Modal
                isOpen={searchModalOpen}
                onRequestClose={() => setSearchModalOpen(false)}
                bodyOpenClassName="overflow-hidden"
                overlayClassName="fixed inset-0 bg-[rgba(39,116,174,0.85)]"
                className="relative top-[10%] max-h-[70vh] md:w-[65%] lg:w-[60%] xl:w-[50%] md:mx-auto items-center p-6 sm:p-8 md:p-12 shadow rounded overflow-x-scroll"
            >
                <Search onlyInput />
                <div>
                    <a onClick={() => setSearchModalOpen(false)}>Close</a>
                </div>
            </Modal>
        </>
    )
}

export { Navbar };
