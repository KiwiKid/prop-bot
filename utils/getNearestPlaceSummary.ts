import WikiJS from "wikijs";
import { places } from "./places";

const RADIUS = 1000

const getNearestPlaceSummary = async (latNum:number, lngNum:number) => {
    return await WikiJS().geoSearch(latNum, lngNum, RADIUS)
    .then((res) => {
        debugger;
      console.log(res)
        // TODO: do we need to filter to just regions here?
        return res;
    })
    .then(async (pageName) => {

        
        // const regionPage = pageName.filter((pn) => places.map((p) => p.wikiName).includes(pn))

        const allPageInfo = await pageName.map((pn) => WikiJS().page(pn)
            .then(async page => {
                return {
                    coordinates: await page.coordinates(),
                    summary: await page.summary(),
                    info: await page.fullInfo(),
                    meta: await page.categories(),
                }
            }))
        // @ts-ignore - filter to just articles with a imageMap
        const relvantPageInfo = allPageInfo.filter((api) => api.then((a) => a.info?.general?.imageMap))


        // TODO: include all?
        return relvantPageInfo[0]
    })
}


export {
    getNearestPlaceSummary
}