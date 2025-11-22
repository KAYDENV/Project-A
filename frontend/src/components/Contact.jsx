import React from 'react';

function Contact() {
    return (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 shadow-xl">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Contact & Support</h2>

                <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Email Support</h3>
                            <p className="text-slate-400 text-sm mt-1">For general inquiries and technical assistance.</p>
                            <a href="mailto:support@arogyta.com" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block">support@arogyta.com</a>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                        <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Phone Support</h3>
                            <p className="text-slate-400 text-sm mt-1">Available Mon-Fri, 9am - 6pm EST.</p>
                            <a href="tel:+15551234567" className="text-green-400 hover:text-green-300 text-sm mt-2 inline-block">+1 (555) 123-4567</a>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
                        <p className="text-slate-400 text-sm">
                            Need immediate help? Check our <a href="#" className="text-blue-400 hover:underline">Documentation</a> or <a href="#" className="text-blue-400 hover:underline">FAQ</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
