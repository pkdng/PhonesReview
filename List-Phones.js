const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries()); // tempat menampung parameter yang ada

fetch(`https://api-mobilespecs.azharimm.site/v2/brands`).then((data)=>{
    // fetch("https://api-mobilespecs.azharimm.site/v2/brands/${brand_slug}")
// console.log(data);
    return data.json();

}).then((comletedata)=>{
    // console.log(comletedata.data.phones[1].brand);
    // document.querySelectorAll('root')=comletedata.data.phones[1].brand;
    const elLoad =  document.querySelector('#loading');
    let slug = null;
    const value = params.value

    comletedata.data.forEach(element => {
        if(element.brand_name.toLowerCase() === value.toLowerCase()){
            console.log(element.brand_name, element.brand_slug)
            slug = element.brand_slug
        }
    });

    console.log(slug);

    if(slug !== null){
        fetch(`https://api-mobilespecs.azharimm.site/v2/brands/${slug}`).then((data) => {
            return data.json();
        }).then((phone) => {
            console.log(phone);
            elLoad.classList.add('d-none')

            let data1= " ";
            phone.data.phones.map((values)=>{
                data1+=`<div class="col-md-4 col-sm-6">
                    <div class="card mb-30"><a class="card-img-tiles" href=${values.detail}>
                        <div class="main-img"><img src=${values.image} alt="Category"></div>
                        <div class="card-body text-center">
                            <h4 class="card-title">${values.phone_name}</h4>
                            <p class="text-muted">${values.brand}</p><a class="btn btn-outline-primary btn-sm" href=${values.detail}>View Products</a>
                        </div>
                    </div>
                </div> `;
                document.getElementById('divcard').innerHTML= data1;
            })
        }).catch((err)=>{
            console.log(err); 
        })
    }else{
        console.log("Brand Not Found")
        elLoad.innerHTML = "Brand Not Found"
    }
}).catch((err)=>{
    console.log(err);
})