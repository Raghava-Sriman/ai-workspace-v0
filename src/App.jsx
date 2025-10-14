import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icon Components (using inline SVG for simplicity) ---
const LogoIcon = (props) => (
  <svg {...props} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 shrink-0">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MenuIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const SunIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m4.93 17.66 1.41-1.41" /><path d="m17.66 4.93 1.41-1.41" />
    </svg>
);

const MoonIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
);

const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const PlusIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="M12 5v14" />
  </svg>
);

const SendIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
  </svg>
);

const CpuIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
    </svg>
);

const CopyIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
);

const EditIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />
    </svg>
);

const ImageIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
    </svg>
);

const FileIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
    </svg>
);

const MoreHorizontalIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);


// --- Hook for Theme Management ---
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = window.localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return [theme, toggleTheme];
};


// --- App Components ---

const Header = React.memo(({ theme, toggleTheme, onNewChat, activeChatId, chatHistory }) => {
    return (
        <header className="absolute top-0 left-0 right-0 z-10 h-16 grid grid-cols-3 items-center px-4 md:px-6 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-sm">
            <div className="flex items-center">
                 <button 
                    onClick={onNewChat} 
                    className="flex items-center space-x-2 p-2 -ml-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Start new chat"
                >
                    <LogoIcon />
                    <span className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                        Workspace
                    </span>
                </button>
            </div>
            <div className="text-center text-sm font-semibold text-zinc-600 dark:text-zinc-400 truncate">
                <span>{activeChatId ? chatHistory.find(c => c.id === activeChatId)?.title : ""}</span>
            </div>
             <div className="flex items-center justify-end space-x-2 md:space-x-4">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400" aria-label="Toggle Theme">
                    {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                </button>
                <button className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400" aria-label="User Profile">
                    <UserIcon className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
});

const Sidebar = React.memo(({ isSidebarOpen, onToggleSidebar, onNewChat, chatHistory, loadChat, activeChatId, onDeleteChat }) => {
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isSidebarOpen ? '16rem' : '4rem' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="bg-zinc-100 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col z-30 shrink-0"
        >
            <div className="flex items-center h-16 px-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    <MenuIcon className="h-6 w-6" />
                </button>
            </div>
            <nav className="flex flex-col p-2 space-y-1 flex-grow overflow-y-auto overflow-x-hidden themed-scrollbar">
                <button onClick={onNewChat} className="relative group flex items-center w-full p-2 space-x-3 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shrink-0">
                    <PlusIcon className="h-5 w-5" />
                    {isSidebarOpen && <span className="whitespace-nowrap overflow-hidden">New Chat</span>}
                    {!isSidebarOpen && <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">New Chat</div>}
                </button>
                
                {isSidebarOpen && chatHistory.length > 0 && <h3 className="px-2 pt-4 pb-1 text-xs font-semibold text-zinc-500 uppercase shrink-0">Recent</h3>}
                
                <div className="flex flex-col space-y-1">
                    {chatHistory.map((chat) => (
                         <div key={chat.id} className="relative group">
                             <button onClick={() => loadChat(chat.id)} className={`flex items-center w-full p-2 space-x-3 rounded-lg text-left text-sm ${activeChatId === chat.id ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'} text-zinc-700 dark:text-zinc-300 shrink-0`}>
                                <div className="flex-grow overflow-hidden">
                                    {isSidebarOpen && <span className="whitespace-nowrap truncate">{chat.title}</span>}
                                </div>
                            </button>
                            {isSidebarOpen && (
                                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                                    <button onClick={() => setOpenMenuId(openMenuId === chat.id ? null : chat.id)} className="p-1 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontalIcon className="h-4 w-4" />
                                    </button>
                                     <AnimatePresence>
                                        {openMenuId === chat.id && (
                                            <motion.div
                                                ref={menuRef}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-zinc-800 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden z-20"
                                            >
                                                <button onClick={() => console.log("Share")} className="block w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700">Share</button>
                                                <button onClick={() => console.log("Rename")} className="block w-full text-left px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700">Rename</button>
                                                <button onClick={() => onDeleteChat(chat.id)} className="block w-full text-left px-3 py-1.5 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">Delete</button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                            {!isSidebarOpen && <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">{chat.title}</div>}
                         </div>
                    ))}
                </div>
            </nav>
        </motion.aside>
    );
});

const WelcomeScreen = () => (
    <motion.div 
        className="text-center m-auto px-4"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
    >
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100">AI Workspace, Reimagined.</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Describe your task, ask a question, or connect a data source to begin.
        </p>
    </motion.div>
);

const UserPrompt = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);
    const textRef = useRef(null);

    const checkExpansion = useCallback(() => {
        const element = textRef.current;
        if (element) {
             const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
             const maxHeight = lineHeight * 3;
             setCanExpand(element.scrollHeight > maxHeight + 2); // Add a small buffer
        }
    }, []);

    useEffect(() => {
        const element = textRef.current;
        if (!element) return;
        
        checkExpansion();

        const resizeObserver = new ResizeObserver(() => {
            checkExpansion();
        });
        resizeObserver.observe(element);
        
        return () => resizeObserver.disconnect();
    }, [text, checkExpansion]);
    
    const handleCopy = () => { navigator.clipboard.writeText(text); };

    return (
         <div className="group relative w-full max-w-4xl mx-auto p-4 bg-zinc-100 dark:bg-zinc-900/50 rounded-lg">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1 p-1.5 rounded-full bg-blue-100 dark:bg-zinc-800">
                    <UserIcon className="h-5 w-5 text-blue-600 dark:text-zinc-300" />
                </div>
                <div className="flex-1 min-w-0">
                    <p ref={textRef} className={`prose prose-zinc dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 break-words ${!isExpanded && 'line-clamp-3'}`}>
                        {text}
                    </p>
                    {canExpand && (
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-500 text-sm mt-2 font-semibold">
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    )}
                </div>
            </div>
             <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={handleCopy} className="p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400">
                    <CopyIcon className="h-4 w-4" />
                </button>
                <button className="p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400">
                    <EditIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}

const AIResponse = ({ text }) => {
    return (
        <div className="w-full max-w-4xl mx-auto p-4">
             <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1 p-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <CpuIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-zinc-800 dark:text-zinc-200 mb-2">Answer</div>
                    <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 break-words">
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const MainChatArea = ({ messages }) => {
    const scrollRef = useRef(null);
    const conversationPairs = [];

    for (let i = 0; i < messages.length; i += 2) {
        if (messages[i] && messages[i].sender === 'user') {
            conversationPairs.push({ user: messages[i], ai: messages[i + 1] });
        }
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto themed-scrollbar">
            <div className="pt-24 pb-8 px-4 md:px-6">
                 {messages.length === 0 ? (
                    <div className="flex flex-col h-[calc(100vh-12rem)]">
                        <WelcomeScreen />
                    </div>
                ) : (
                    <div className="w-full">
                        {conversationPairs.map((pair, index) => (
                            <motion.div key={pair.user.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                                {index > 0 && <div className="w-full max-w-4xl mx-auto my-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800"></div>}
                                <UserPrompt text={pair.user.text} />
                                {pair.ai && (
                                    <>
                                        <div className="w-full max-w-3xl mx-auto my-3 border-t border-zinc-200 dark:border-zinc-800"></div>
                                        <AIResponse text={pair.ai.text} />
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const Composer = ({ onSendMessage }) => {
    const [input, setInput] = useState('');
    const [isUploadMenuOpen, setUploadMenuOpen] = useState(false);
    const textareaRef = useRef(null);
    const imageInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const menuRef = useRef(null);
    
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [input]);
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setUploadMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input.trim());
            setInput('');
        }
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        if (file) {
            console.log(`Selected ${fileType}:`, file.name);
            // Handle file upload logic here
        }
        setUploadMenuOpen(false);
    };

    return (
        <div className="shrink-0 p-4 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent">
            <div className="w-full max-w-4xl mx-auto">
                <div className="relative" ref={menuRef}>
                    <AnimatePresence>
                        {isUploadMenuOpen && (
                             <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-full mb-2 w-48 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden z-10"
                            >
                                <button onClick={() => imageInputRef.current.click()} className="flex items-center w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                                    <ImageIcon className="h-4 w-4 mr-3" />
                                    Pictures
                                </button>
                                <button onClick={() => fileInputRef.current.click()} className="flex items-center w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                                    <FileIcon className="h-4 w-4 mr-3" />
                                    Files
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="relative bg-zinc-100 dark:bg-zinc-900 rounded-2xl shadow-lg shadow-black/10 border border-zinc-200 dark:border-zinc-800">
                        <input type="file" ref={imageInputRef} onChange={(e) => handleFileChange(e, 'image')} className="hidden" accept="image/*" />
                        <input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e, 'file')} className="hidden" />

                        <button onClick={() => setUploadMenuOpen(prev => !prev)} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-blue-500">
                            <PlusIcon className="h-5 w-5"/>
                        </button>
                        <textarea ref={textareaRef} rows="1" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Describe your task..." className="w-full bg-transparent p-4 pl-12 pr-12 text-zinc-800 dark:text-zinc-200 resize-none focus:outline-none placeholder:text-zinc-400 no-scrollbar" style={{ maxHeight: '120px' }} />
                        <button onClick={handleSend} disabled={!input.trim()} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-blue-500 disabled:opacity-50 disabled:hover:text-zinc-400"><SendIcon className="h-5 w-5" /></button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

// --- Main App Component ---

export default function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
    const [messages, setMessages] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [theme, toggleTheme] = useTheme();

    useEffect(() => {
        try {
            const savedHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
            const savedActiveId = localStorage.getItem('activeChatId');
            setChatHistory(savedHistory);
            if (savedActiveId) {
                const activeChat = savedHistory.find(c => c.id === savedActiveId);
                if (activeChat) {
                    setMessages(activeChat.messages);
                    setActiveChatId(savedActiveId);
                }
            }
        } catch (error) {
            console.error("Failed to parse chat history from localStorage", error);
        }
    }, []);

    const saveState = (history, activeId) => {
        localStorage.setItem('chatHistory', JSON.stringify(history));
        if (activeId) {
            localStorage.setItem('activeChatId', activeId);
        } else {
            localStorage.removeItem('activeChatId');
        }
    };
    
    const handleNewChat = useCallback(() => {
        setMessages([]);
        setActiveChatId(null);
        if (window.innerWidth < 1024) setSidebarOpen(false);
        localStorage.removeItem('activeChatId');
    }, []);

    const handleSendMessage = useCallback((text) => {
        const userMessage = { id: Date.now(), text, sender: 'user' };
        let currentChatId = activeChatId;
        let updatedHistory = [...chatHistory];
        let newMessages;

        if (!currentChatId) {
            currentChatId = `chat_${Date.now()}`;
            const newChat = {
                id: currentChatId,
                title: text.length > 25 ? `${text.substring(0, 22)}...` : text,
                messages: [userMessage],
            };
            updatedHistory = [newChat, ...updatedHistory];
            newMessages = [userMessage];
        } else {
             newMessages = [...messages, userMessage];
            updatedHistory = updatedHistory.map(chat =>
                chat.id === currentChatId ? { ...chat, messages: newMessages } : chat
            );
        }
        
        setMessages(newMessages);
        setActiveChatId(currentChatId);
        setChatHistory(updatedHistory);
        saveState(updatedHistory, currentChatId);

        setTimeout(() => {
            const aiResponse = { id: Date.now() + 1, text: `This is a simulated AI response to: "${text}". The response would be generated by a powerful language model to assist with consultant tasks.`, sender: 'ai' };
            const finalMessages = [...newMessages, aiResponse];
            const finalHistory = updatedHistory.map(chat =>
                chat.id === currentChatId ? { ...chat, messages: finalMessages } : chat
            );
            setMessages(finalMessages);
            setChatHistory(finalHistory);
            saveState(finalHistory, currentChatId);
        }, 1200);
    }, [activeChatId, chatHistory, messages]);
    
    const loadChat = useCallback((chatId) => {
        const chatToLoad = chatHistory.find(chat => chat.id === chatId);
        if (chatToLoad) {
            setActiveChatId(chatId);
            setMessages(chatToLoad.messages);
            saveState(chatHistory, chatId);
        }
        if (window.innerWidth < 1024) setSidebarOpen(false);
    }, [chatHistory]);

    const handleDeleteChat = useCallback((chatIdToDelete) => {
        const newHistory = chatHistory.filter(chat => chat.id !== chatIdToDelete);
        setChatHistory(newHistory);

        if (activeChatId === chatIdToDelete) {
            handleNewChat();
            saveState(newHistory, null);
        } else {
            saveState(newHistory, activeChatId);
        }
    }, [activeChatId, chatHistory, handleNewChat]);
    
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    
    return (
        <>
            <style>{`
                :root {
                    --scrollbar-thumb: #cbd5e1;
                    --scrollbar-track: #e2e8f0;
                }
                html.dark {
                    --scrollbar-thumb: #4b5563;
                    --scrollbar-track: #1f2937;
                }
                .themed-scrollbar::-webkit-scrollbar { width: 8px; }
                .themed-scrollbar::-webkit-scrollbar-track { background: var(--scrollbar-track); }
                .themed-scrollbar::-webkit-scrollbar-thumb { background-color: var(--scrollbar-thumb); border-radius: 20px; border: 3px solid var(--scrollbar-track); }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <div className={`h-screen w-screen flex font-sans overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300`}>
                <Sidebar 
                    isSidebarOpen={isSidebarOpen} 
                    onToggleSidebar={toggleSidebar} 
                    onNewChat={handleNewChat} 
                    chatHistory={chatHistory} 
                    loadChat={loadChat} 
                    activeChatId={activeChatId}
                    onDeleteChat={handleDeleteChat}
                />
                <div className="flex-1 flex flex-col min-w-0 h-full relative">
                   <Header 
                        theme={theme} 
                        toggleTheme={toggleTheme} 
                        onNewChat={handleNewChat}
                        activeChatId={activeChatId}
                        chatHistory={chatHistory}
                    />
                   <MainChatArea messages={messages} />
                   <Composer onSendMessage={handleSendMessage} />
                </div>
            </div>
        </>
    );
}

