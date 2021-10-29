import { getPhoneSpecifications } from "./fetch.js"

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries()); // tempat menampung parameter yang ada

const specification = document.querySelector('#specification');

const tableData = document.createElement('table');
tableData.classList.add('table','m-0','table-bordered');
const tableBodyD = document.createElement('tbody')

const tableTitle = document.createElement('table');
tableTitle.classList.add('table', 'table-bordered')
const tableBodyT = document.createElement('tbody')

const createSpecData = (key, val) => {
    console.log(key, val)
    let tr = {}; let th = {}
    tr = document.createElement('tr');
    th = document.createElement('th');
    th.style.width = "15%";

    th.innerHTML = key
    tr.appendChild(th);
    val.forEach((element, i) => {
        if(i > 0){
            const trn = document.createElement('tr')
            const tdn = document.createElement('td')
            const tdn1 = document.createElement('td')
            tdn.innerHTML = element;
            trn.appendChild(tdn1);
            trn.appendChild(tdn);
    
            tableBodyD.appendChild(trn)
            tableData.appendChild(tableBodyD);
        }else{
            let td = {}
            td = document.createElement('td');
            td.innerHTML = element;
            tr.appendChild(td);
        
            tableBodyD.appendChild(tr)
            tableData.appendChild(tableBodyD);
						specification.appendChild(tableData)
        }
    })
    return tableData
}

const createSpecTitle = (specs, title, index) => {
    // let tr = {}; let th = {}; let td = {}
    // tr[index] = document.createElement('tr');
    // th[index] = document.createElement('th');
    // td[index] = document.createElement('td');

		// console.log(td[index])

    // th[index].innerHTML = title;
    // tr[index].appendChild(th[index])
    // console.log(title)
    specs.forEach((element, i) => {
				createSpecData(element.key, element.val, i)
        // td[index].appendChild(createSpecData(element.key, element.val, i))
        // tr[index].appendChild(td[index])

        // tableBodyT.appendChild(tr[index])
        // tableTitle.appendChild(tableBodyT);
        // specification.appendChild(tableTitle);
    })
    return specification
}

const createCard = (name, brand, img) => {
	document.getElementById('card-phone').innerHTML = `
	<div class="row g-0">
	<div class="col-md-3">
		<img 
			src="${img}""
			class="img-fluid" 
			alt="img"
			style="height: 300px;"
		>
	</div>
	<div class="col-md-9">
		<div class="card-body">
			<h4 class="card-title text-muted">${brand}</h4>
			<h3 class="card-title">${name}</h3>
		</div>
	</div>
</div>
	`;
}

const renderPosts = async () => {
    let phoneSpec = await getPhoneSpecifications(params.value)

    if(phoneSpec){
        document.querySelector("#loading").classList.add('d-none')
        document.querySelector('#phone-detail').classList.remove('d-none')

				console.log(phoneSpec)
				createCard(phoneSpec.data.phone_name, phoneSpec.data.brand, phoneSpec.data.phone_images[0])

        phoneSpec.data.specifications.forEach((element, index) => {
            document.createElement('p').innerHTML = `ini title ${index}`
            console.log(element.specs, element.title)
            createSpecTitle(element.specs, element.title, index)
        });
    }
};

renderPosts()