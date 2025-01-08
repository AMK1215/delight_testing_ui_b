import React from 'react'
import SuggestedResult from './SuggestedResults'
import SearchNoResult from './SearchNoResult'
import SearchResult from './SearchResults'

const truncateGameName = (gameName: string) => {
    return gameName.slice(0, 10) + '...'
}
const SearchGamesResult = () => {
    return (
        <div className={`absolute bg-secondary p-4 rounded-md top-12 left-0 right-0 w-[400px] z-50`}>
            <InputSearchResult />
        </div>
    )
}

export default SearchGamesResult


const InputSearchResult = () => {
    return <div>
        {/* <SearchNoResult/> */}
        <SuggestedResult />
        {/* <SearchResult /> */}
    </div>
}






