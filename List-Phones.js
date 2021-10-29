fetch("https://api-mobilespecs.azharimm.site/v2/brands/apple-phones-48?page=2").then((data)=>{
    // fetch("https://api-mobilespecs.azharimm.site/v2/brands/${brand_slug}")
// console.log(data);
    return data.json();

}).then((comletedata)=>{
    // console.log(comletedata.data.phones[1].brand);
    // document.querySelectorAll('root')=comletedata.data.phones[1].brand;
    let data1= " ";
    comletedata.data.phones.map((values)=>{
        data1+=`<div class="col-md-4 col-sm-6">
        <div class="card mb-30"><a class="card-img-tiles" href=${values.detail}>
            <div class="main-img"><img src=${values.image} alt="Category"></div>
            <div class="card-body text-center">
                <h4 class="card-title">${values.phone_name}</h4>
                <p class="text-muted">${values.brand}</p><a class="btn btn-outline-primary btn-sm" href=${values.detail}>View Products</a>
            </div>
        </div>
    </div> `;

    }) 
     document.getElementById('divcard').innerHTML= data1;


}).catch((err)=>{
console.log(err);
})