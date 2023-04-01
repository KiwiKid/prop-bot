import { getNearestPlaceSummary } from "@/utils/getNearestPlaceSummary";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    try { 

    const { lat, lng } = req.query;
    const RADIUS = 10000


    const latNum = parseFloat(lat as string);
    const lngNum = parseFloat(lng as string);

    if(!latNum || !lngNum){
        res.status(400).json({ error: 'Invalid lat/lng query params'})
    }

    const result = await getNearestPlaceSummary(latNum, lngNum)


        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", raw: error });
    }
  }