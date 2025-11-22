import React, { useState, useRef, useEffect } from 'react';

const AIAssistant = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Hello! I am your Arogyta Assistant. How can I help you today?' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const SUGGESTED_QUESTIONS = [
        "What is Arogyta?",
        "How do I upload records?",
        "Who can see my data?",
        "Is my data safe?",
        "Contact Support"
    ];

    const getAIResponse = (question) => {
        const q = question.toLowerCase();
        if (q.includes('what is arogyta')) return "Arogyta is a privacy-first platform for storing and managing personal records. We use blockchain to ensure your data is tamper-proof and secure.";
        if (q.includes('upload')) return "You can upload records by clicking the 'Upload' button on your dashboard. Your files are encrypted and stored securely off-chain.";
        if (q.includes('who can see')) return "Only YOU can see your data by default. Institutions can only access your records if you explicitly grant them permission via a smart contract.";
        if (q.includes('safe') || q.includes('security')) return "Yes! Your data is encrypted, and a unique hash is stored on the blockchain. This guarantees that no one can alter your records without detection.";
        if (q.includes('contact')) return "You can reach our support team at support@arogyta.com for any urgent issues.";
        return "I'm not sure about that. Please try asking one of the suggested questions below.";
    };

    const handleQuestionClick = (question) => {
        setMessages(prev => [...prev, { sender: 'user', text: question }]);
        setIsTyping(true);

        setTimeout(() => {
            const response = getAIResponse(question);
            setMessages(prev => [...prev, { sender: 'ai', text: response }]);
            setIsTyping(false);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed bottom-8 right-8 z-50 flex flex-col items-end transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-[120%]'}`}>
            <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col h-[500px]">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">Arogyta Assistant</h3>
                            <p className="text-xs text-blue-100">Always here to help</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                ? 'bg-purple-600 text-white rounded-tr-none'
                                : 'bg-slate-700 text-slate-200 rounded-tl-none'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-slate-700 p-3 rounded-2xl rounded-tl-none flex space-x-1">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                <div className="p-4 bg-slate-900 border-t border-slate-700">
                    <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">Suggested Questions</p>
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTED_QUESTIONS.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleQuestionClick(q)}
                                className="text-xs bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-300 px-3 py-1.5 rounded-full transition-colors border border-slate-700"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
