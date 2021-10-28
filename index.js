import { getTopByInterest , getTopByFans , getLatestPhones, getListPhones, getListBrands, getPhoneSpecifications, getPhone} from "./fetch.js"

const submitSearch = document.querySelector('#form-search')

const row = document.querySelector('#row-devices');
const latestDevice = document.querySelector('#latest-device')
const topInt = document.querySelector('#top-interest');
const topFans = document.querySelector('#top-fans');
const tBodyInt = document.createElement('tbody');
const tHeadInt = document.createElement('thead');
const tBodyFans = document.createElement('tbody');
const tHeadFans = document.createElement('thead');

const createInterest = (phone, hits, index) => {
    const elTable = document.createElement('table')
    elTable.classList.add('table','table-striped','mb-0', 'table-sm')
    const elRow = document.createElement('tr');
    const elPhone = document.createElement('td');
    const elHits = document.createElement('td');

    if(index == 0){
        const elHeadRow = document.createElement('tr');
        const elHeadPhone = document.createElement('th');
        const elHeadHits = document.createElement('th');
        
        elHeadRow.appendChild(elHeadPhone);
        elHeadRow.appendChild(elHeadHits);
        tHeadFans.appendChild(elHeadRow);
        elTable.appendChild(tHeadFans);

        elHeadPhone.innerHTML = "Phone Name"
        elHeadHits.innerHTML = "Hits"
    }

    elRow.appendChild(elPhone);
    elRow.appendChild(elHits)
    tBodyInt.appendChild(elRow);
    elTable.appendChild(tBodyInt);
    topInt.appendChild(elTable)
    
    elPhone.innerHTML = phone
    elHits.innerHTML = hits
}

const createFans = (phone, fav, index) => {
    const elTable = document.createElement('table')
    elTable.classList.add('table','table-striped','mb-0', 'table-sm');
    const elRow = document.createElement('tr');
    const elPhone = document.createElement('td');
    const elHits = document.createElement('td');

    if(index == 0){
        const elHeadRow = document.createElement('tr');
        const elHeadPhone = document.createElement('th');
        const elHeadFav = document.createElement('th');
        
        elHeadRow.appendChild(elHeadPhone);
        elHeadRow.appendChild(elHeadFav);
        tHeadInt.appendChild(elHeadRow);
        elTable.appendChild(tHeadInt);

        elHeadPhone.innerHTML = "Phone Name"
        elHeadFav.innerHTML = "Favorite"
    }

    elRow.appendChild(elPhone);
    elRow.appendChild(elHits)
    tBodyFans.appendChild(elRow);
    elTable.appendChild(tBodyFans);
    topFans.appendChild(elTable)

    elPhone.innerHTML = phone
    elHits.innerHTML = fav
}

const createLatestDevices = (name, image, detail) => {
    const elLink = document.createElement('a')
    elLink.setAttribute('href',detail)
    elLink.style.textDecoration ="none"
    elLink.style.color = "black"
    
    console.log(detail)

    const elCol = document.createElement('div')
    elCol.classList.add('col');

    const elCard = document.createElement('div')
    elCard.classList.add('card','p-1','border-0')
    elCard.style.width = "100%";
    elCard.onmouseover = () => {
        elCard.style.transform = "scale(1.05)";
        elCard.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        elCard.style.cursor = "pointer"
        elCard.style.color = "#4169E1"
    }
    elCard.onmouseout = () => {
        elCard.style.transform = "none";
        elCard.style.boxShadow = "none";
        elCard.style.color = "black";
        console.log(detail)
    }

    const elImg = document.createElement('img')
    elImg.setAttribute('src',image);
    elImg.setAttribute('alt','image');
    elImg.classList.add('card-img-top');

    const elTitle = document.createElement('h6');
    const t = document.createTextNode(name)
    elTitle.classList.add('card-title','text-center','mt-2')

    elTitle.appendChild(t);
    elCard.appendChild(elImg);
    elCard.appendChild(elTitle);
    elCol.appendChild(elCard);
    elLink.appendChild(elCol);
    row.appendChild(elLink)
    latestDevice.appendChild(row)
}

// Search by brand
submitSearch.onsubmit = async (e) => {
    e.preventDefault();
    
    const value = submitSearch.firstElementChild.value
    let slug = null;
    let brands = await getListBrands();

    brands.data.forEach(element => {
        if(element.brand_name.toLowerCase() === value.toLowerCase()){
            console.log(element.brand_name, element.brand_slug)
            slug = element.brand_slug
        }
    });

    if(slug !== null){
        let phone = await getListPhones(slug);
        console.log(phone);
        // submitSearch.setAttribute('action',`phone-list.html?brand_slug=${slug}`)
    }else{
        console.log("Brand Not Found")
    }
}

const renderPosts = async () => {
    // Top by Interest
    let topInterest = await getTopByInterest()
    const listPhonesInt = topInterest.data.phones

    listPhonesInt.forEach((element, index) => {
        createInterest(element.phone_name, element.hits, index)
    });

    // Top by Fans
    let topFans = await getTopByFans()
    const listPhonesFans = topFans.data.phones
    //console.log(topFans)

    listPhonesFans.forEach((element, index) => {
        createFans(element.phone_name, element.favorites, index)
    });

    // Latest Devices
    let devices = await getLatestPhones()
    //console.log(devices)
    const listDevice = devices.data.phones
    
    listDevice.forEach(element => {
        createLatestDevices(element.phone_name, element.image, element.detail)
        
    });
}

renderPosts();