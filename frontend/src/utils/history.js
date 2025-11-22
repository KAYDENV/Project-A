export const getHistory = () => {
    const history = localStorage.getItem('arogyta_history');
    return history ? JSON.parse(history) : [];
};

export const addToHistory = (action, details) => {
    const history = getHistory();
    const newItem = {
        id: Date.now(),
        action, // 'UPLOAD', 'GRANT_ACCESS', 'MODIFY'
        details,
        timestamp: new Date().toISOString()
    };
    const newHistory = [newItem, ...history];
    localStorage.setItem('arogyta_history', JSON.stringify(newHistory));
    return newHistory;
};

export const clearHistory = () => {
    localStorage.removeItem('arogyta_history');
};
