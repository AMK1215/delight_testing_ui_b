const SearchResult = () => {
    const truncateGameName = (gameName: string) => {
        return gameName.slice(0, 10) + '...'
    }
    return <div >
        <p className="text-sm text-active mb-6">Your Filter Results</p>
        <div className='max-h-[70vh] sm:max-h-[450px] overflow-scroll overflow-y-scroll'>
            <div className="grid grid-cols-3 gap-x-10 gap-y-4 ">
                {[1, 2, 3, 4, 5, 6, 8, 9, 0, 1, 2, 3, 4, 5, 6, 8, 9, 0].map((_, index) => {
                    return <div key={index}>
                        <img src={'https://upld.linkv2.com/UploadedFiles/games-images/OGE/20230518/f1151c083e614bbbb1cf6c364bc3898b_TheGame_998BET_06_41_1.jpg'} alt='Game Img' className='w-full  rounded-lg' />
                        <p className="text-white mt-2 text-xs font-semibold">
                            {truncateGameName('Squid Game')}
                        </p>
                    </div>
                })}
            </div>
            <p className="text-center mt-4 text-sm text-zinc-500 font-semibold">
                You have seen it all
            </p>
        </div>
    </div>
}

export default SearchResult;