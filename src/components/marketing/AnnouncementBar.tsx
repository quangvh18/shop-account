import { Sparkles, Gift, Zap, Star } from "lucide-react";

interface Announcement {
    icon: React.ElementType;
    text: string;
    highlight?: string;
}

const announcements: Announcement[] = [
    { icon: Gift, text: "Giảm giá 50%", highlight: "tất cả sản phẩm AI Tools!" },
    { icon: Zap, text: "Giao hàng tự động 24/7", highlight: "" },
    { icon: Star, text: "Bảo hành chính hãng", highlight: "lên đến 12 tháng" },
    { icon: Sparkles, text: "Ưu đãi đặc biệt", highlight: "cho khách hàng mới!" },
];

const AnnouncementBar = () => {
    // Duplicate announcements for seamless loop
    const duplicatedAnnouncements = [...announcements, ...announcements, ...announcements];

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-2.5">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

            {/* Marquee container */}
            <div className="flex animate-marquee">
                {duplicatedAnnouncements.map((announcement, index) => {
                    const Icon = announcement.icon;
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-2 px-8 whitespace-nowrap"
                        >
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
                                <Icon className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-white text-sm font-medium">
                                {announcement.text}
                                {announcement.highlight && (
                                    <span className="ml-1 font-bold text-yellow-300">
                                        {announcement.highlight}
                                    </span>
                                )}
                            </span>
                            <span className="mx-6 text-white/40">•</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AnnouncementBar;
