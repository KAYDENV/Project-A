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
            export default AIAssistant;
