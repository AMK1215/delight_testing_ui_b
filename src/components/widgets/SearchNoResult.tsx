import { SearchIcon } from "lucide-react";

const SearchNoResult = () => {
    return <div className='text-sm text-zinc-400 font-semibold'>
        <p className="text-sm text-active mb-6">Your Filter Results</p>
        <div className='mb-2 flex justify-center items-center gap-1'><SearchIcon size={13} /> Search No Result</div>
        <p>{ `We're sorry. We cannot find any matches for your search term.`}</p>
    </div>
}

export default SearchNoResult;