'use client';
import {FC, JSX} from "react";
import {FaInstagram, FaLinkedin, FaTwitter, FaYoutube} from "react-icons/fa";

const Footer: FC = () => {
    const menuItems: string[] = [
        "اتاق خبر",
        "گزارش آسیب‌پذیری",
        "پشتیبانی و قوانین"
    ];

    const socialLinks: { href: string; icon: JSX.Element; label: string }[] = [
        {
            href: "https://twitter.com/divar_official",
            icon: <FaTwitter size={20}/>,
            label: "Twitter"
        },
        {
            href: "https://www.instagram.com/divar.official",
            icon: <FaInstagram size={20}/>,
            label: "Instagram"
        },
        {
            href: "https://www.linkedin.com/company/divarofficial",
            icon: <FaLinkedin size={20}/>,
            label: "LinkedIn"
        },
        {
            href: "https://www.aparat.com/divar.official",
            icon: <FaYoutube size={20}/>,
            label: "YouTube"
        }
    ];

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300
         rounded-md !p-4 !mb-1 ">
            <div
                className="container mx-auto flex flex-col md:flex-row items-start md:items-center
                justify-between gap-6 p-6">

                <nav className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                    {menuItems.map((item, index) => (
                        <a
                            key={index}
                            className="text-[0.75rem] hover:text-black  border-gray-300"
                            href="#"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4 mt-2 md:mt-0">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="text-gray-500 hover:text-black transition-colors duration-200"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

            </div>
        </footer>
    );
};

export default Footer;
