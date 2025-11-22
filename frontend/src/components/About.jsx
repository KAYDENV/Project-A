import React from 'react';

function About() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 shadow-xl">
                <h2 className="text-3xl font-bold text-white mb-6">About Arogyta</h2>
                <p className="text-slate-300 leading-relaxed text-lg">
                    Arogyta is a next-generation privacy platform that empowers individuals to take full control of their personal data.
                    In a world where data breaches are common, we provide a secure haven for your most sensitive information.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Our Vision</h3>
                    <p className="text-slate-400">
                        To create a digital ecosystem where privacy is a fundamental right, not a luxury. We envision a future where every individual has absolute authority over who accesses their personal records.
                    </p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Our Mission</h3>
                    <p className="text-slate-400">
                        To leverage blockchain transparency and AI intelligence to build the most secure, user-centric data management platform available, ensuring trust and integrity in every interaction.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
