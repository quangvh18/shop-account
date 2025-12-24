import { IconType } from "react-icons";
import {
    SiOpenai,
    SiYoutube,
    SiDuolingo,
    SiSpotify,
    SiAnthropic,
    SiNetflix,
    SiGoogle,
    SiCanva,
    SiGithub,
    SiJetbrains,
    SiNotion,
    Si1Password
} from "react-icons/si";
import { FaXTwitter, FaVideo, FaMagnifyingGlass, FaHeart } from "react-icons/fa6";
import { BsMicrosoft } from "react-icons/bs";

// Brand logo mapping for account types
export const accountTypeLogos: Record<string, {
    icon: IconType;
    color: string;
    bgClass: string;
    name: string
}> = {
    "ChatGPT Plus": {
        icon: SiOpenai,
        color: "#10A37F",
        bgClass: "bg-[#10A37F]",
        name: "ChatGPT"
    },
    "YouTube Premium": {
        icon: SiYoutube,
        color: "#FF0000",
        bgClass: "bg-[#FF0000]",
        name: "YouTube"
    },
    "Duolingo Super": {
        icon: SiDuolingo,
        color: "#58CC02",
        bgClass: "bg-[#58CC02]",
        name: "Duolingo"
    },
    "Spotify Premium": {
        icon: SiSpotify,
        color: "#1DB954",
        bgClass: "bg-[#1DB954]",
        name: "Spotify"
    },
    "Claude Pro": {
        icon: SiAnthropic,
        color: "#D97757",
        bgClass: "bg-[#D97757]",
        name: "Claude"
    },
    "CapCut Pro": {
        icon: FaVideo,
        color: "#000000",
        bgClass: "bg-black",
        name: "CapCut"
    },
    "Gemini Pro": {
        icon: SiGoogle,
        color: "#4285F4",
        bgClass: "bg-[#4285F4]",
        name: "Gemini"
    },
    "Netflix Premium": {
        icon: SiNetflix,
        color: "#E50914",
        bgClass: "bg-[#E50914]",
        name: "Netflix"
    },
    "SuperGrok": {
        icon: FaXTwitter,
        color: "#000000",
        bgClass: "bg-black",
        name: "Grok"
    },
    "Google One": {
        icon: SiGoogle,
        color: "#4285F4",
        bgClass: "bg-[#4285F4]",
        name: "Google One"
    },
    "Perplexity Pro": {
        icon: FaMagnifyingGlass,
        color: "#20B2AA",
        bgClass: "bg-[#20B2AA]",
        name: "Perplexity"
    },
    "Microsoft 365": {
        icon: BsMicrosoft,
        color: "#F25022",
        bgClass: "bg-gradient-to-br from-[#F25022] to-[#00A4EF]",
        name: "Microsoft"
    },
    "Canva Pro": {
        icon: SiCanva,
        color: "#00C4CC",
        bgClass: "bg-[#00C4CC]",
        name: "Canva"
    },
    "GitHub Copilot Pro": {
        icon: SiGithub,
        color: "#181717",
        bgClass: "bg-[#181717]",
        name: "GitHub"
    },
    "JetBrains": {
        icon: SiJetbrains,
        color: "#000000",
        bgClass: "bg-gradient-to-br from-[#FE315D] to-[#F97A12]",
        name: "JetBrains"
    },
    "Lovable Pro": {
        icon: FaHeart,
        color: "#FF6B9D",
        bgClass: "bg-[#FF6B9D]",
        name: "Lovable"
    },
    "1Password Individual": {
        icon: Si1Password,
        color: "#0094F5",
        bgClass: "bg-[#0094F5]",
        name: "1Password"
    },
    "Notion Plus": {
        icon: SiNotion,
        color: "#000000",
        bgClass: "bg-black",
        name: "Notion"
    }
};

export const getAccountTypeLogo = (accountType: string | undefined) => {
    if (!accountType) return null;
    return accountTypeLogos[accountType] || null;
};
