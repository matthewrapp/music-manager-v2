import { FaLink, FaMagnet } from "react-icons/fa";

export const dashboardLinks = [
    { name: 'Smart Links', href: '/smart-links', icon: <FaLink />, tierLevels: ['free', 'basic', 'pro'] },
    { name: 'Fan Magnets', href: '/fan-magnets', icon: <FaMagnet />, tierLevels: ['pro'] }
];