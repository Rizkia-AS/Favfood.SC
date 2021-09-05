class gridList extends HTMLElement {
    set makanans(list) {
        this._makanans = list;
        this.render();
    }

    render() {
        this.innerHTML = ``;
        const css = document.createElement(`style`);
        css.innerHTML = `
            grid-list {
                display: grid;
                padding: 10px;
                grid-gap: 10px;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            }
        `
        this.prepend(css)
        this._makanans.map(data => {
            const makananItem = document.createElement(`makanan-item`);
            makananItem.makanan = data;
            this.appendChild(makananItem);
        })
    }
} customElements.define(`grid-list`,gridList);



class makanan extends HTMLElement {
    set makanan(data) {
        this._makanan = data;
        this._icon = null;
        this.icon();
        this.render();
    }
    
    render() {
        this.setAttribute(`id`,`${this._makanan._id}`)
        this.innerHTML = `
        <style>
            makanan-item {
                background-color : white;
                display: flex;
                justify-content: space-between;
                padding: 5px;
                border: 1px solid #CCCCCC;
            }
            
            makanan-item article {
                display: flex;
                padding-left: 20px;
                align-items: center;
            }
            
            .food-info {margin-left: 20px;}
            
            makanan-item .settings {
                display: flex;
                align-items: center;
                gap: 30px;
                padding-right: 30px;
            }

            makanan-item .settings span:hover {
                background-color:#DAD0C2;
                border-radius: 50%;
                cursor : pointer;
            }
        </style>
        
        <article>
            <span class="material-icons-outlined">${this._icon}</span>
            <div class="food-info">
                <h2>${this._makanan.nama}</h2>
                <p>${this._makanan.kategori}</p>
            </div>
        </article>
        
        <div class="settings">
            <span class="material-icons-outlined edit">edit</span>
            <span class="material-icons-outlined delete">delete</span>
        </div>
        `
    }

    icon() {
        if(this._makanan.kategori == `Gorengan`) {
            this._icon = `bakery_dining`;
        } else if(this._makanan.kategori == `Makanan`) {
            this._icon = `lunch_dining`;
        } else if(this._makanan.kategori == `Kue kering`) {
            this._icon = `cookie`
        } else if(this._makanan.kategori == `Kue basah`) {
            this._icon = `filter_drama`
        } else if(this._makanan.kategori == `Minuman`) {
            this._icon = `local_cafe`
        }
    }
} customElements.define(`makanan-item`,makanan)



class customFooter extends HTMLElement {
    connectedCallback() {
		this.innerHTML = `
        <style>
            cs-footer {
                display : block;
                box-sizing: border-box;
                text-align :center;
                font-size: 17px;
                line-height : 60px;
                background-color: #F4DFD0;
                height: 60px;
                filter: drop-shadow(4px 4px 2px rgba(0,0,0,0.25));
            }

            @media screen and (max-width: 900px) {
                cs-footer span, cs-footer a {font-size: 14px;}
            }
            @media screen and (max-width: 500px) {
                cs-footer span,cs-footer a {font-size: 11px;}
            }
        </style>
        <p><a href="https://www.dicoding.com/academies/163" target="_blank">Belajar Fundamental Front-End Web Development</a></p>`;
    }
} customElements.define(`cs-footer`, customFooter);



class miniInfo extends HTMLElement {
    set input(data) {
        this._data = data.meal;
        this._area = data.area;
        this.render()
    }

    render() {
        this.innerHTML = `
        <style>
            mini-info img {
                display: block;
                width: 100%;
                max-height: 200px;
                margin: 0 auto;
                margin-top: 5px;
                object-fit: cover;
                object-position: center;
            }

            mini-info div {
                color: white;
                filter: drop-shadow(1px 1px 0 black);
                position: absolute;
                bottom: 15px;
                left: 15px;
            }

            mini-info div h2 {font-size : 17px;}

            @media screen and (max-width: 900px) {
                mini-info img {max-height: 150px;}
            }
            @media screen and (max-width: 500px) {
                mini-info img {max-height: 140px;}
            }
            @media screen and (max-width: 350px) {
                mini-info img {max-height: 130px;}
            }
        </style>
        
        <p>Rekomendasi</p>
        <img src="${this._data.gambar}" alt="">
        <div>
            <h2>${this._data.nama}</h2>
            <h3>${this._area}</h3>
        </div>
        `
    }
} customElements.define(`mini-info`,miniInfo);



export {gridList,customFooter,miniInfo};