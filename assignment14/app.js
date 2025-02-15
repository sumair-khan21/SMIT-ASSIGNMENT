let flavour = prompt(`Enter Your Flavours
   Chicken Pizza
   BBQ Pizza
   Beef Pizza
   Fajita Pizza
   Classic Pizza
   Veggie Pizza
   `).toLowerCase();

let pizzaCost = 0;
let drinkCost = 0;

if(flavour === "chicken" || flavour === "bbq" || flavour === "beef" || flavour === "fajita" || flavour === "classic" || flavour === "veggie"){
    let size = prompt(`Enter Pizza Size
        1. Small Pizza 10$
        2. Medium Pizza 20$
        3. Large Pizza 30$
        Please Select Number (1, 2, or 3)
        `)
        if(size === "1"){
            pizzaCost += 10
            alert(`Your Order is ${flavour} Pizza in Small Size!`);
        }else if(size === "2"){
            pizzaCost += 20
            alert(`Your Order is ${flavour} Pizza in Medium Size!`); 
        }else if(size === "3"){
            pizzaCost += 30
            alert(`Your Order is ${flavour} Pizza in Large Size!`); 
        }else{
            alert(`Invalid Size Selected. Try Again`)
            pizzaCost = 0;
        }
        if(pizzaCost > 0){
            let cont = prompt(`Do You Want Drinks?`).toLowerCase();
           if(cont === "yes"){
            let drink = prompt(`Enter Your Drinks
                1. Pepsi 5$
                2. Coca-Cola 5$
                3. Sprite 5$
                Please Select Number
                `);
                if(drink === "1"){
                    drinkCost += 5;
                    alert(`You Select Pepsi drink. The cost of drink is $5`)
                }else if(drink === "2"){
                    drinkCost += 5;
                    alert(`You Select Coca-Cola drink.  The cost of drink is $5`)
                }else if(drink === "3"){
                    drinkCost += 5;
                    alert(`You Select Sprite drink. The cost of drink is $5`)
                }
                else{
                 alert(`Invalid Drink`)
                }        
           }else if(cont === "no"){
            alert("No Drink added.")
           }else{
            alert(`Invalid input for drinks`)
           }
           alert(`Thanks For Choosing Papa John's! Your Total Bill is ${pizzaCost + drinkCost}$`)
        }

    
}else{
alert(`Please Select Correct Option!`)
}

