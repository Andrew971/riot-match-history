import { ajaxGetMethodConfig } from '@lib/constant'
import { riotPlatform } from '@lib/constant'

export interface GameInfo {
  gameId: number
  gameName: string
  gameMode: string
  gameCreation: number
  gameDuration: number
}
export interface PlayerStats {
  championName: string
  kills: number
  assists: number
  deaths: number
  win: boolean
  champLevel: number
  itemsPurchased: number
  champExperience: number
}

export interface ChampionInfo {
  name: string
  title: string
  image: { full: string }
  spells: Array<{
    id: string
    name: string
    image: { full: string }
  }>
}

export interface MatchRecord {
  gameInfo: GameInfo & { win: PlayerStats['win'] },
  playerStats: Pick<PlayerStats, 'kills' | 'assists' | 'deaths'> & {
    kda: string,
  },
  champion: {
    name: ChampionInfo['name'],
    title: ChampionInfo['title'],
    avatarURl: string,
    spells: Array<{
      spellId: ChampionInfo['spells'][number]['id'],
      spellName: ChampionInfo['spells'][number]['name'],
      imageURL: string,
    }>,
    level: PlayerStats['champLevel'],
    champExperience: PlayerStats['champExperience'],
  },
  items: Array<{
    itemId: number,
    name: string,
    imageURL: string,
  }>,
  purchases: number,

}


class MatchHistoryService {
  private static instance: MatchHistoryService;
  items: any
  platform: keyof typeof riotPlatform
  host: string
  searchTerm: string
  private constructor() {
    this.items = {}
    this.platform = riotPlatform.BR1.name as keyof typeof riotPlatform
    this.host = riotPlatform.BR1.host
    this.searchTerm = ''
  }

  public static getInstance(): MatchHistoryService {
    if (!MatchHistoryService.instance) {
      MatchHistoryService.instance = new MatchHistoryService();
    }
    return MatchHistoryService.instance;
  }

  public async init() {
    if (Object.keys(this.items).length === 0) {
      this.items = await fetch(
        `http://ddragon.leagueoflegends.com/cdn/13.5.1/data/en_US/item.json`,
        ajaxGetMethodConfig
      )
        .then((response) => response.json())
        .then((response) => response.data)
        .catch((err) => console.error(err));
    }
  }

  set routingPlatform(platform: keyof typeof riotPlatform) {
    if (!riotPlatform[platform]) throw new Error('Provide a valid platform')
    this.platform = platform
    this.host = riotPlatform[platform].host
  }
  set playerName(playerName: string) {
    if (!playerName) throw new Error('Provide a player name')
    this.searchTerm = playerName
  }


  private async getPlayerInfoByName(name: string) {
    try {
      const result = await fetch(
        `https://${this.host}/lol/summoner/v4/summoners/by-name/${name}`,
        ajaxGetMethodConfig
      ).then((response) => response.json())

      if (!result) throw new Error('No Player or Match record found')
      if (result.status && result.status.status_code === 404) throw new Error('No Player or Match record found')
      if (result.name === 'undefined') throw new Error('No Player or Match record found')
      return result
    } catch (err) {
      throw err
    }
  }

  private async getMatchHistoryByPlayer(id: number) {
    try {
      const result = await fetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${id}/ids?start=0&count=5`,
        ajaxGetMethodConfig
      ).then((response) => response.json())

      if (!result) throw new Error('No Player or Match record found')
      return result
    } catch (err) {
      throw err
    }
  }

  private async getMatchInfoByMatchId(id: string) {
    try {
      const result = await fetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${id}`,
        ajaxGetMethodConfig
      )
        .then((response) => response.json())
        .then((response) => response.info)
        .catch((err) => console.error(err));

      if (!result) throw new Error('No Player or Match record found')
      return result
    } catch (err) {
      throw err
    }
  }
  private async getChampionInfoByChampionName(championName: string) {
    try {
      const result = await fetch(
        `http://ddragon.leagueoflegends.com/cdn/13.5.1/data/en_US/champion/${championName}.json`,
        ajaxGetMethodConfig
      )
        .then((response) => response.json())
        .then((response) => response.data[championName])

      if (!result) throw new Error('No Player or Match record found')
      return result
    } catch (err) {
      throw err
    }
  }

  public async getMatchHistory(): Promise<MatchRecord[]> {
    try {
      const playerInfo = await this.getPlayerInfoByName(this.searchTerm)
      const matchHistory = await this.getMatchHistoryByPlayer(playerInfo.puuid)

      const history = await Promise.all(
        matchHistory.map(async (matchId: string) => {
          const matchInfo = await this.getMatchInfoByMatchId(matchId)
          const playerStats: PlayerStats & { [key: `item${number}`]: number } = matchInfo.participants.find(
            (participant: any) => participant.puuid === playerInfo.puuid
          );
          const championInfo = await this.getChampionInfoByChampionName(playerStats.championName)
          return {
            gameInfo: {
              gameId: matchInfo.gameId,
              gameName: matchInfo.gameName,
              gameMode: matchInfo.gameMode,
              gameCreation: matchInfo.gameCreation,
              gameDuration: matchInfo.gameDuration * 1000,
              win: playerStats.win,
            },
            playerStats: {
              kills: playerStats.kills || 0,
              assists: playerStats.assists || 0,
              deaths: playerStats.deaths || 0,
              kda:
                playerStats.deaths > 0
                  ? `${(
                    (Number(playerStats.kills) + Number(playerStats.assists)) /
                    Number(playerStats.deaths)
                  ).toFixed(2)}:1`
                  : "perfect",
            },
            champion: {
              name: playerStats.championName,
              title: championInfo.title,
              avatarURl: `http://ddragon.leagueoflegends.com/cdn/13.5.1/img/champion/${championInfo.image.full}`,
              spells: championInfo.spells.map((spell: any) => ({
                spellId: spell.id,
                spellName: spell.name,
                imageURL: `http://ddragon.leagueoflegends.com/cdn/13.5.1/img/spell/${spell.image.full}`,
              })),
              level: playerStats.champLevel,
              champExperience: playerStats.champExperience,
            },
            items: Array.from({ length: 7 }, (_x, index) => ({
              itemId: playerStats[`item${index}`],
              name: this.items[playerStats[`item${index}`]]
                ? this.items[playerStats[`item${index}`]].name
                : "",
              imageURL: `http://ddragon.leagueoflegends.com/cdn/13.5.1/img/item/${playerStats[`item${index}`]
                }.png`,
            })).filter((item: any) => item.itemId !== 0),
            purchases: playerStats.itemsPurchased || 0,
          };
        })
      );
      return history || []
    } catch (err) {
      throw err
    }

  }
}
const instance = MatchHistoryService.getInstance()
export default instance