import AnalyticsCard, { AICard, BusinessCard, LiveCoding, NormalCard } from "./cards/AllCard";

export default function FloatingCard() {
    return (
        <div className="grid grid-cols-2 gap-3">
            <BusinessCard variant="grid" className="col-span-2" />

            <NormalCard
                variant="grid"
                text="ចាប់ផ្ដើម"
                imagePath="/assets/image/play.png"
            />

            <NormalCard
                variant="grid"
                text="ស្វែងយល់"
                imagePath="/assets/image/play.png"
            />

            <NormalCard
                variant="grid"
                text="online"
                imagePath="/assets/image/play.png"
            />

            <NormalCard
                variant="grid"
                text="រៀនគ្មានដែនកំណត់"
                imagePath="/assets/image/play.png"
            />

            <NormalCard
                variant="grid"
                text="អនុវត្តកូដដោយផ្ទាល់"
                className="col-span-2"
            />

            <LiveCoding
                variant="grid"
                text="រៀនគ្រប់ទីកន្លែងបានគ្រប់ពេល"
                className="col-span-2"
            />

            <AICard
                variant="grid"
                text="AI ជំនួយការសិក្សា ជួយអ្នក"
                className="col-span-2 items-center"
            />

            <AnalyticsCard variant="grid" className="col-span-2" />
        </div>
    )
}