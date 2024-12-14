'use client'

import React, {useEffect, useRef, useState} from 'react'
import Image from "next/image"
import Button from "@/components/Button";
import {TiLocationArrow} from "react-icons/ti";
import Link from "next/link";
import {navItems} from "@/constants/nav-items";
import {useWindowScroll} from "react-use";
import gsap from 'gsap'

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);

    const navContainerRef = useRef<HTMLDivElement>(null);
    const audioElementRef = useRef<HTMLAudioElement>(null);

    const {y: currentScrollY} = useWindowScroll();

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current?.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current?.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navContainerRef.current?.classList.add('floating-nav');
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        })
    }, [isNavVisible]);

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    }

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current?.play();
        } else {
            audioElementRef.current?.pause();
        }
    }, [isAudioPlaying]);

    return (
        <div ref={navContainerRef}
             className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        <Image
                            src="/img/logo.png"
                            alt="Zentry Logo"
                            className="w-10"
                            height={40}
                            width={40}
                        />

                        <Button
                            id="product-button"
                            title="Product"
                            rightIcon={<TiLocationArrow/>}
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>

                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            {navItems.map((item, index) => (
                                <Link key={index} href={item.href} className="nav-hover-btn">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <button className="ml-10 flex items-center space-x-0.5" onClick={toggleAudioIndicator}>
                            <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop/>
                            {[1, 2, 3, 4].map((bar) => (
                                <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                     style={{
                                         animationDelay: `${bar * 0.1}s`
                                     }}>
                                </div>
                            ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}
export default Navbar
