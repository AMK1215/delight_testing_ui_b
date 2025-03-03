'use client';

import { SearchIcon, Undo2Icon, XIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import SuggestedResult from './SuggestedResults';

const MobileSearchGames = () => {
    const [search, setSearch] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleIconClick = () => {
        setIsInputVisible(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };


    return (
        <div className="relative" ref={containerRef}>
            {isInputVisible && <Undo2Icon onClick={() => setIsInputVisible(false)} className='text-active' />}
            <div
                onClick={handleIconClick}
                className="mt-2 flex flex-row items-center justify-between border-2 border-zinc-500 px-2 py-1 rounded-full border-input focus-within:border-white"
            >
                <div className="flex items-center">
                    <SearchIcon className="h-4 w-4" />
                    <div
                        className={`transition-all duration-300 ease-in-out ${isInputVisible ? 'w-48 opacity-100' : 'w-0 opacity-0'
                            } overflow-hidden`}
                    >
                        <input
                            ref={inputRef}
                            placeholder="Find Games"
                            value={search}
                            onChange={(e) => setSearch(e.target.value.trim())}
                            className="appearance-none bg-transparent focus:bg-inherit blur:bg-inherit outline-none px-2 text-sm w-full"
                        />
                    </div>
                    {isInputVisible && search.length > 0 && <XIcon onClick={() => setSearch('')} className='text-zinc-500 cursor-pointer' size={20} />}
                </div>
            </div>
            {isInputVisible && (
                <div className= "my-6 h-max">
                    <SuggestedResult />
                    {/* <SearchResult/> */}
                    {/* <SearchNoResult/> */}
                </div>
            )}
        </div>
    );
};

export default MobileSearchGames;

