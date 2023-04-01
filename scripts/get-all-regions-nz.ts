import WikiJS from 'wikijs';
const locations: [number, number][] = [
 // [-41.28664, 174.77557], // Wellington
 // [-36.84846, 174.76334], // Auckland
 // [-45.86682, 170.50775], // Dunedin
 // [-43.53205, 172.63623],  // Christchurch
  [-43.37852896219917, 172.66348426648506]
];

(async () => {
    let regions = []
  const wiki = await WikiJS({ apiUrl: 'https://en.wikipedia.org/w/api.php' });
  for (const location of locations) {
    const [lat, lng] = location;
    const results = await wiki.geoSearch(lat, lng, 10000);
   // console.log(`Results for (${lat}, ${lng}):`);
 //   console.log(results);
    const res = await results.map(async (r) => {
        return await wiki.page(r)
            .then(async page => {
                return {
                    coordinates: await page.coordinates(),
                    summary: await page.summary(),
                    info: await page.fullInfo(),
                    meta: await page.categories(),
                }
            })
            .then(summary => {
            // Check if the summary mentions a geographic region
            return {
                page: r,
                summary: summary.summary,
                isMatch: summary.summary.match(/is a (city|region|state|province|country)/i) !== null,
                // @ts-ignore
                isMapMatch: !!summary.info?.general?.imageMap
            }
        }).then((r) => {
            if(r.isMapMatch){
                console.log(r.summary)
            }
            
        })
    })
  }
})();
