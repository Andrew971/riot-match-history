import type { NextApiRequest, NextApiResponse } from "next";
import { riotPlatform } from '@lib/constant'
import MatchHistoryService, { MatchRecord } from '@services/MatchHistoryService'


type Data = {
  items: MatchRecord[]
  error?:string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { searchTerm, platform } = req.body
    await MatchHistoryService.init()
    MatchHistoryService.playerName = searchTerm
    MatchHistoryService.routingPlatform = platform as keyof typeof riotPlatform
    const matchHistory = await MatchHistoryService.getMatchHistory()

    res.status(200).json({
      items: matchHistory || []
    });
  } catch (err: any) {
    console.log(err)
    res.status(200).json({
      items: [],
      error: err.message as string
    });
  }

}
