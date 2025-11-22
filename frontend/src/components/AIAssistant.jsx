import React, { useState, useRef, useEffect } from 'react';

const AIAssistant = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { type: 'ai', text: 'Hello! I am your Arogyta Assistant. How can I help you today?' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const options = [
        {
            id: 1,
            label: "What is Arogyta?",
            answer: "Arogyta is a privacy-first platform for storing and managing personal records. We use blockchain to ensure your data is tamper-proof and secure."
        },
        {
            id: 2,
            label: "How do I upload records?",
            answer: "You can upload records by clicking the 'Upload' button on your dashboard. Your files are encrypted and stored securely off-chain."
        },
        {
            id: 3,
            label: "Who can see my data?",
            answer: "Only YOU can see your data by default. Institutions can only access your records if you explicitly grant them permission via a smart contract."
        },
        {
            id: 4,
            label: "Is my data safe?",
            answer: "Yes! Your data is encrypted, and a unique hash is stored on the blockchain. This guarantees that no one can alter your records without detection."
        },
        {
            id: 5,
            label: "Contact Support",
            answer: "You can reach our support team at support@arogyta.com for any urgent issues."
        }
    ];

    const handleOptionClick = (option) => {
        // Add user message
        setMessages(prev => [...prev, { type: 'user', text: option.label }]);

        // Simulate AI thinking
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { type: 'ai', text: option.answer }]);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="p-4 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">Arogyta Assistant</h3>
                        <span className="text-xs text-green-400 flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span>
                            Online
                        </span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.type === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl rounded-tl-none flex space-x-1">
                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Options Area */}
            <div className="p-4 bg-slate-800/30 border-t border-slate-700/50">
                <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wider">Suggested Questions</p>
                <div className="flex flex-wrap gap-2">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            disabled={isTyping}
                            className="text-sm px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
