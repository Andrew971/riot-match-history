import SearchBar from "@components/searchBar";
import moment from "moment";
import { memo } from "react";
import { MatchRecord } from "@services/MatchHistoryService";

interface CardProps {
  data: MatchRecord;
}
function Card({ data }: CardProps) {
  return (
    <li>
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 hover:bg-gray-50">
        <div className="flex flex-row items-center px-4 py-4 sm:px-6">
          <div className="flex flex-col items-center px-4 py-4 sm:px-6">
            <div>{data.gameInfo.gameMode}</div>
            <div>{moment(data.gameInfo.gameCreation).fromNow()}</div>
            ---
            <div>{data.gameInfo.win ? "Victory" : "Defeat"}</div>
            <div>{moment.duration(data.gameInfo.gameDuration).humanize()}</div>
          </div>
          <div className="flex flex-col items-center px-4 py-4 sm:px-6">
            <div className="flex flex-row items-center gap-4 px-4 py-4 sm:px-6">
              <div className="flex-shrink-0">
                <img
                  className="h-14 w-14 rounded-full"
                  src={data.champion.avatarURl}
                  alt=""
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {data.champion.spells.map((spell, index) => (
                  <div
                    key={`${data.gameInfo.gameId}-${spell.spellId}-${index}`}
                    className="flex-shrink-0 group relative"
                  >
                    <img
                      className="h-8 w-8 squared-full"
                      src={spell.imageURL}
                      alt=""
                    />
                    <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 top-0 -translate-x-0 translate-y-0 opacity-0 mx-auto z-10">
                      {spell.spellName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>{data.champion.name}</div>
            <div>{data.champion.title}</div>
          </div>
        </div>
        <div className="flex flex-col items-center px-4 py-4 sm:px-6">
          <div>
            {data.playerStats.kills} / {data.playerStats.deaths} /{" "}
            {data.playerStats.assists}
          </div>
          <div>{data.playerStats.kda}</div>
        </div>
        <div className="flex flex-col items-center px-4 py-4 sm:px-6">
          <div>Level {data.champion.level}</div>
          <div>item purchased:{data.purchases}</div>
        </div>
        <div className="flex flex-col items-center px-4 py-4 sm:px-6">
          <div className="grid grid-cols-3 gap-2 ">
            {data.items.map((item, index) => (
              <div
                key={`${data.gameInfo.gameId}-${item.itemId}-${index}`}
                className="flex-shrink-0 group relative"
              >
                <img
                  className="h-8 w-8 squared-full"
                  src={item.imageURL}
                  alt=""
                />
                <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 top-0 -translate-x-0 translate-y-0 opacity-0 mx-auto z-10">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

export default memo(Card);
