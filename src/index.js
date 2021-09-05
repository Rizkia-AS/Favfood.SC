import "regenerator-runtime";
import {gridList,customFooter,miniInfo} from "./script/webcom.js"
import {lsEpKey,LearnApi,loadData,upData,renderLimitInfo, renderList,themealdbApi,getEl,$} from "./script/functions.js"
import main from "./script/main.js"
import "./style/style.css";


window.addEventListener(`load`, async ()=> {
    main();
    let endpoint = null;

    if(loadData(lsEpKey) && loadData(lsEpKey) != null) {  
        endpoint = loadData(lsEpKey);
        $(`.used-api`).html(`${endpoint}`);
    } else {
        upData(lsEpKey, await LearnApi.getEndpoint())
        endpoint = loadData(lsEpKey);

        const defData = [
            {
                nama : `Tahu bulat`,
                kategori : `Gorengan`
            },
            {
                nama : `Bakso`,
                kategori : `Makanan`
            },
            {
                nama : `Nastar`,
                kategori : `Kue kering`
            },
            {
                nama : `Nagasaki`,
                kategori : `Kue basah`
            },
            {
                nama : `Es teh`,
                kategori : `Minuman`
            }
        ]
        defData.map(data => LearnApi.post(endpoint,data));

        setTimeout(() => {
            location.reload();
        },3000);
    }

    const dataList = await LearnApi.get(endpoint)
    renderList(dataList);
    renderLimitInfo(endpoint);

    const area = await themealdbApi.randomArea();
    const meal = await themealdbApi.randomMeal(area);
    getEl(`mini-info`).input = {area,meal}
    
})