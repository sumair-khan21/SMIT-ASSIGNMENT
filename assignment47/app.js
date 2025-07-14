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
            console.log("products", jsonData);
            arrData = jsonData

            arrData.forEach((element)=>{
                console.log(element);

                if(!price.includes(element.price)){
                    price.push(element.price)
                }
                
                if(!category.includes(element.category)){
                    category.push(element.category)
                }
                renderData(element)
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
            console.log(category);
            console.log(price);
        }

        function renderData(data){
            showData.innerHTML  += `
            <div class="card">
                <img src="${data.image}" alt="${data.title}">
                <div class="card-content">
                    <h1>${data.title.slice(0,5)}</h1>
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
            filter.forEach((ele)=>{
                renderData(ele)
            })
        }

  inputValue.addEventListener('keyup', ()=>{
    let userLowerCase  = inputValue.value.toLowerCase();
    showData.innerHTML = ""
    let matchValue = false;

    arrData.forEach((ele)=>{
        let dataValues = ele.title.toLowerCase()
        if(dataValues.includes(userLowerCase)){
            renderData(ele)
            matchValue = true; 
        }
    })
    if(!matchValue){
        showData.innerHTML = `<div class="no-products">No Products Found</div>`;
    }
})


        fetchData()