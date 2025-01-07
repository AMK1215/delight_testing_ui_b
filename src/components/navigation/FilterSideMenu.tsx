'use client';
import { ClubIcon, FilterIcon, Gamepad2Icon, LayoutGridIcon, SearchIcon, VolleyballIcon, XIcon } from 'lucide-react'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Input } from '../ui/input';
import { useRouter, useSearchParams } from 'next/navigation';

const FilterSideMenu = () => {
    const [activeGameType, setActiveGameType] = useState('all');
    const gameTypes = [
        { id: 1, icon: <LayoutGridIcon size={20} />, name: 'All', value: 'all' },
        { id: 2, icon: <VolleyballIcon size={20} />, name: 'Sports', value: 'sports' },
        { id: 3, icon: <ClubIcon size={20} />, name: 'Live Casinos', value: 'casinos' },
        { id: 4, icon: <Gamepad2Icon size={20} />, name: 'Slots', value: 'slots' }
    ];

    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');

    const addSearchParamsToRouter = useCallback((value: string) => {
        router.push(`?search=${value}`)
    }, [])

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (value === '') return clearSearch();
        setSearch(value)
        addSearchParamsToRouter(value);
    }
    const clearSearch = useCallback(() => {
        setSearch('');
        router.push('/')
    }, [])
    return (
        <Sheet>
            <SheetTrigger>
                <div className='bg-active p-3 cursor-pointer rounded-full text-secondary absolute bottom-4 right-4'>
                    <FilterIcon size={18} />
                </div>
            </SheetTrigger>
            <SheetContent className='px-0 py-0'>
                <SheetHeader className='relative h-full'>
                    <SheetTitle className='text-left px-4'>
                        <p className='text-active mt-3'>Filter By</p>
                    </SheetTitle>
                    <SheetDescription>
                        <div className="px-4 mt-5">
                            <div className="flex flex-row space-x-2 items-center border border-input px-5 rounded-full bg-secondary cursor-pointer">
                                <SearchIcon className="h-4 w-4" />
                                <Input value={search} onChange={handleSearchInput} placeholder="Search" className="appearance-none bg-secondary" />
                                {search.length > 0 && <XIcon onClick={clearSearch} className="h-6 w-6" />}
                            </div>
                            <div className=" mt-5 bg-secondary p-3 rounded-2xl">
                                {gameTypes.map((item) => {
                                    return <div onClick={() => setActiveGameType(item.value)} key={item.id} className={`${activeGameType === item.value ? 'text-active' : 'text-zinc-400'} ${item.id === gameTypes.length ? 'border-b-0' : 'border-b-2'} hover:text-active py-3 flex items-center gap-2  border-black cursor-pointer transition-all ease-in-out duration-200`}>
                                        {item.icon}
                                        <p>{item.name}</p>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="bg-secondary py-3 text-center absolute bottom-0 right-0 left-0">
                            <Button onClick={clearSearch} className="border-2  text-sm px-12  border-active text-active rounded-full font-bold">
                                RESET
                            </Button>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>


    )
}

export default FilterSideMenu
