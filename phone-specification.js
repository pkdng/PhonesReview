import { getPhoneSpecifications } from "./fetch.js"

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries()); // tempat menampung parameter yang ada

const specification = document.querySelector('#specification');

const tableData = document.createElement('table');
tableData.classList.add('table','m-0');
const tableBodyD = document.createElement('tbody')

const tableTitle = document.createElement('table');
tableTitle.classList.add('table', 'table-bordered')
const tableBodyT = document.createElement('tbody')

const createSpecData = (key, val, index) => {
    console.log(key, val)
    let tr = {}; let th = {}
    tr[index] = document.createElement('tr');
    th[index] = document.createElement('th');
    th[index].style.width = "15%";

    th[index].innerHTML = key
    tr[index].appendChild(th[index]);
    val.forEach((element, i) => {
        console.log(element)
        if(i > 0){
            const trn = document.createElement('tr')
            const tdn = document.createElement('td')
            const tdn1 = document.createElement('td')
            th[index].classList.add('border-0')
            tdn.innerHTML = element;
            trn.appendChild(tdn1);
            trn.appendChild(tdn);
    
            tableBodyD.appendChild(trn)
            tableData.appendChild(tableBodyD);
        }else{
            let td = {}
            td[index] = document.createElement('td');
            td[index].innerHTML = element;
            tr[index].appendChild(td[index]);
        
            tableBodyD.appendChild(tr[index])
            tableData.appendChild(tableBodyD);
        }
    })
    return tableData
}

const createSpecTitle = (specs, title, index) => {
    let tr = {}; let th = {}; let td = {}
    tr[index] = document.createElement('tr');
    th[index] = document.createElement('th');
    td[index] = document.createElement('td');

		console.log(td[index])

    th[index].innerHTML = title;
    tr[index].appendChild(th[index])
    console.log(title)
    specs.forEach((element, i) => {
        console.log(element.key)
        td[index].appendChild(createSpecData(element.key, element.val, i))
        tr[index].appendChild(td[index])

        tableBodyT.appendChild(tr[index])
        tableTitle.appendChild(tableBodyT);
        specification.appendChild(tableTitle);
    })
    return specification
}

const renderPosts = async () => {
    let phoneSpec = await getPhoneSpecifications(params.value)

    if(phoneSpec){
        document.querySelector("#loading").classList.add('d-none')
        document.querySelector('#phone-detail').classList.remove('d-none')
        phoneSpec.data.specifications.forEach((element, index) => {
            document.createElement('p').innerHTML = `ini title ${index}`
            console.log(element.specs, element.title)
            createSpecTitle(element.specs, element.title, index)
        });
    }
};

renderPosts()