import {lsEpKey,LearnApi,renderLimitInfo,loadData,upData,getEl, renderList,$,capitalize} from "./functions.js"


const main = () => {
    let posY = null;

    const resetPage = () => {
        $(`.name-input`).val(``);
        $(`.kat-select`).val(`Makanan`);
        $(`.kategori-list`).val(`Semua`);
        $(`.id-input`).val(``);
        $(`.form-title`).text(`Tambahkan makanan`);
        $(`.sub-button`).text(`Simpan`);
    }

    window.addEventListener(`click`, async (e) => {
        const point = e.target.classList;
        
        if(point.contains(`refresh-button`)) {
            upData(lsEpKey,await LearnApi.getEndpoint());
            let endpoint = loadData(lsEpKey);

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

            alert(`Server sedang direset ulang`)
            setTimeout(() => {
                location.reload();
            },3000);
        }

        if(point.contains(`edit`)) {
            const selected = e.target.parentNode.parentNode;

            $(`.form-title`).text(`Ubah makanan`)
            $(`.sub-button`).text(`Ubah`)
            $(`.name-input`).val(selected.childNodes[3].childNodes[3].childNodes[1].innerText);
            $(`.kat-select`).val(selected.childNodes[3].childNodes[3].childNodes[3].innerText);
            $(`.id-input`).val(selected.id);

            posY = window.scrollY;
            window.scroll(0,0);
            $(`.name-input`).toggleClass(`play-change-anim`);
            $(`.kat-select`).toggleClass(`play-change-anim`);
            setTimeout(() => {
                $(`.name-input`).toggleClass(`play-change-anim`);
                $(`.kat-select`).toggleClass(`play-change-anim`);
            }, 1100);
        }

        if(point.contains(`delete`)) {
            const id = e.target.parentNode.parentNode.id;
            let endpoint = loadData(lsEpKey);

            await LearnApi.delete(endpoint,id);

            const list = await LearnApi.get(endpoint)
            renderList(list);
            renderLimitInfo(endpoint);
            setTimeout(()=> {
                alert(`Data berhasil dihapus`);
            },500)
        }

        if(point.contains(`api-exit`) || point.contains(`api-toggle`)) {
            $(`.api-info`).toggleClass(`show-api`)
        }

    })

    getEl(`form`).addEventListener(`submit`, async e => {
        e.preventDefault();

        let endpoint = loadData(lsEpKey);
        window.scroll(0,posY);

        const formData = {
            nama : capitalize($(`.name-input`).val()),
            kategori : $(`.kat-select`).val()
        } 
        
        if(getEl(`.id-input`).value != ``) {
            await LearnApi.put(endpoint,formData,$(`.id-input`).val());
        } else { await LearnApi.post(endpoint,formData); }

        const list = await LearnApi.get(endpoint)
        renderList(list);
        resetPage();
        renderLimitInfo(endpoint);
        setTimeout(()=> {
            alert(`Data berhasil diinput`);
        },500)
    })


    getEl(`.kategori-list`).addEventListener(`change`,async () => {
        let endpoint = loadData(lsEpKey);
        const list = await LearnApi.get(endpoint);
        const category = $(`.kategori-list`).val();

        renderList(list,category);
        renderLimitInfo(endpoint);
    })
}

export default main;