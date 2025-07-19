let url = `https://fakestoreapi.com/products`
        let arrData = []
        let price = []
        let category = []
        let selectedprice = document.getElementById('price')
        let selectedCategory = document.getElementById('category')
        let showData = document.getElementById('main')
        let inputValue = document.getElementById('inputValue')

        async function fetchData(){
            let data = await fetch(url)
            let jsonData = await data.json()
            // console.log("products", jsonData);
            arrData = jsonData

            arrData.forEach((element, index)=>{

                // console.log(element);

                if(!price.includes(element.price)){
                    price.push(element.price)
                }
                
                if(!category.includes(element.category)){
                    category.push(element.category)
                }
                renderData(element, index)
            })

            selectedprice.addEventListener('change', filtration)
            selectedCategory.addEventListener('change', filtration)

            price.forEach((ele)=>{
                selectedprice.innerHTML += `
                <option value="${ele}" >$${ele}</option>
                ` 
            })

            category.forEach((ele)=>{
                selectedCategory.innerHTML += `
                <option value="${ele}" >${ele}</option>
                ` 
            })
            // console.log(category);
            // console.log(price);
        }

        // function renderData(data){
        //     showData.innerHTML  += `
        //     <div class="card">
        //         <img src="${data.image}" alt="${data.title}">
        //         <div class="card-content">
        //             <h1>${data.title.slice(0,5)}</h1>
        //             <div class="price-tag">$${data.price}</div>
        //             <div class="category-tag">${data.category}</div>
        //             <p>${data.description.slice(0,30)}...</p>
        //         </div>
        //     </div>
        //     `
        // }

    function renderData(data, index){
    showData.innerHTML  += `
    <div class="card" data-index="${index}" onclick="details(${data.id})">
        <img src="${data.image}" alt="${data.title}">
        <div class="card-content">
            <h1>${data.title.slice(0,25)}</h1>
            <div class="price-tag">$${data.price}</div>
            <div class="category-tag">${data.category}</div>
            <p>${data.description.slice(0,30)}...</p>
            
        </div>
    </div>
    `
}


        function filtration(){
            let priceValue = selectedprice.value;
            let categoryValue = selectedCategory.value
            let filter = arrData.filter((ele)=>{
                return (
                (priceValue == "" || priceValue == ele.price) &&
                (categoryValue == "" || categoryValue == ele.category)
            )
            })

            showData.innerHTML = ""
            // filter.forEach((ele)=>{
            //     renderData(ele)
            // })
    filter.forEach((ele)=>{
    let index = arrData.indexOf(ele);
    console.log(index);
    renderData(ele, index)

})

        }

  inputValue.addEventListener('keyup', ()=>{
    let userLowerCase  = inputValue.value.toLowerCase();
    showData.innerHTML = ""
    let matchValue = false;

    arrData.forEach((ele)=>{
        let dataValues = ele.title.toLowerCase()
        console.log(ele);
        
        if(dataValues.includes(userLowerCase)){
            renderData(ele )
            matchValue = true; 
        }
    })
    if(!matchValue){
        showData.innerHTML = `<div class="no-products">No Products Found</div>`;
    }
})
showData.addEventListener('click', (event) => {
    
    let card = event.target.closest('.card');
    if(card){
        let index = card.getAttribute('data-index');
        // console.log(index-1);
        
        let product = arrData[index];
        console.log('product data:', product);
        // localStorage.setItem('id',JSON.stringify(product))
    }
})

// function details(recipes){
//     console.log(recipes);
//     localStorage.setItem('id', recipes);
//     // window.location.href = "nextpage.html";

// }
        fetchData()