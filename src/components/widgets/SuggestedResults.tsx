import { LinkIcon } from "lucide-react";
import GameSkeleton from "../skeletons/GameSkeleton";

const SuggestedResult = () => {
  return (
    <div className="text-sm">
      <p className="text-active text-xs mb-5">SUGGESTED GAMES</p>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((_, index) => {
          return (
            <div key={index}>
              <GameSkeleton />
              {/* <img src={'https://upld.linkv2.com/UploadedFiles/games-images/DT/20230725/37faac75143248d4b0ed3366e04d9906_honor_en_us.png'} alt='Game Image' className='w-[80px] h-[56px] rounded-lg' />
                    <p className='mt-2 text-xs font-bold text-white'>
                        {truncateGameName("Field of Honor")}
                    </p> */}
            </div>
          );
        })}
      </div>
      <p className="text-active text-xs mt-8 mb-5">SUGGESTED CATEGORIES</p>
      <div className="border-l-2 pl-2 border-zinc-500">
        {["CQ9", "PGSoft", "JILI", "JILI"].map((item, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer transition-all ease-in-out duration-200 text-sm mb-1 text-zinc-500 hover:text-active font-medium flex items-center gap-1"
            >
              <LinkIcon size={15} />
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedResult;
