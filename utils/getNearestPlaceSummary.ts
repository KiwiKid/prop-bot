import WikiJS from "wikijs";

const RADIUS = 1000

const getNearestPlaceSummary = async (latNum:number, lngNum:number) => {
    return await WikiJS().geoSearch(latNum, lngNum, RADIUS)
    .then((res) => {
      console.log(res)
        // TODO: do we need to filter to just regions here?
        return res.length > 0 ? res[0] : '';
    })
    .then((pageName) => WikiJS().page(pageName))
    .then((page) => page.summary())
}


export {
    getNearestPlaceSummary
}