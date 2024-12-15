import React from 'react'
import {FaDiscord, FaGithub, FaTwitch, FaTwitter} from "react-icons/fa";
import Link from "next/link";

const links = [
    {
        name: "Discord",
        href: "https://discord.com",
        icon: <FaDiscord/>,
    },
    {
        name: "Twitter",
        href: "https://twitter.com",
        icon: <FaTwitter/>,
    },
    {
        name: "Github",
        href: "https://github.com",
        icon: <FaGithub/>,
    },
    {
        name: "Twitch",
        href: "https://twitch.com",
        icon: <FaTwitch/>,
    },

]

const Footer = () => {
    return (
        <footer className="w-screen bg-violet-300 py-4 text-black">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
                <p className="text-center text-sm md:text-left text-white">
                    &copy; 2024. All rights reserved.
                </p>

                <div className="flex justify-center gap-4 md:justify-start">
                    {links.map((link, index) => (
                        <Link key={index} href={link.href} target="_blank" rel="noopener noreferrer"
                              className="text-black transition-colors ease-in-out hover:text-white">
                            {link.icon}
                        </Link>
                    ))}
                </div>
                <Link href="#privacy-policy" className="text-center text-sm hover:underline md:text-right text-white">
                    Privacy Policy
                </Link>
            </div>
        </footer>
    )
}
export default Footer
