import React, { useState, useEffect } from 'react';

const NEWS_ITEMS = [
    {
        id: 1,
        title: "Breakthrough in Gene Therapy",
        summary: "New CRISPR technique shows promise in treating rare genetic disorders with higher precision.",
        source: "Medical News Today",
        color: "from-blue-600 to-cyan-500",
        link: "https://www.medicalnewstoday.com"
    },
    {
        id: 2,
        title: "AI in Early Cancer Detection",
        summary: "Machine learning algorithms can now detect early signs of lung cancer from X-rays with 95% accuracy.",
        source: "Health Tech World",
        color: "from-purple-600 to-pink-500",
        link: "https://www.healthtechworld.com"
    },
    {
        id: 3,
        title: "The Future of Telemedicine",
        summary: "Remote patient monitoring devices are revolutionizing chronic disease management.",
        source: "Digital Health",
        color: "from-emerald-600 to-teal-500",
        link: "https://www.digitalhealth.net"
    },
    {
        id: 4,
        title: "Global Health Update",
        summary: "WHO releases new guidelines for mental health support in the workplace.",
        source: "World Health Organization",
        color: "from-orange-600 to-red-500",
        link: "https://www.who.int"
    }
];

function NewsWidget() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
        }, 10000);

        return () => clearInterval(timer);
    }, []);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    const handleNext = (e) => {
        e.preventDefault(); // Prevent link click if button is inside anchor
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
    };

    const currentNews = NEWS_ITEMS[currentIndex];

    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
                <h3 className="font-semibold text-white flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                    </svg>
                    <span>Medical News</span>
                </h3>
                <div className="flex space-x-1">
                    {NEWS_ITEMS.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleDotClick(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-blue-500 w-4' : 'bg-slate-600 hover:bg-slate-500'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="relative flex-1 group">
                <a
                    href={currentNews.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentNews.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                    <div className="relative p-6 flex flex-col h-full justify-between z-10">
                        <div>
                            <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-white/10 text-white mb-3 backdrop-blur-sm border border-white/10">
                                {currentNews.source}
                            </span>
                            <h4 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-200 transition-colors">
                                {currentNews.title}
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {currentNews.summary}
                            </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center text-sm text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                                Read full article
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                            <button
                                onClick={handleNext}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors text-white"
                                title="Next News"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default NewsWidget;
