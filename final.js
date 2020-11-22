async function getMenu() {
  const response = await fetch('https://mm214.com/menu.php');
  var data = await response.json();

  const { menu } = data;
  const { drinks, sides, toppings, 'slice of pizza':slices } = data.menu;
  const { soda } = data.menu.drinks;

  for (const key in menu) {
    document.querySelector("div.menu").innerHTML += `<h2 id=${key}> ${key.toUpperCase()} </h2>`;
    if (typeof(menu[key]) == 'string') {
      document.querySelector("h2:first-child").innerHTML += `<span> $${slices} each </span> <select name = "slice-qty" id = "slice-qty"><option value="">-- Choose Quantity --</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select`;
    }
  }

  for (const key in toppings) {
    if (toppings.hasOwnProperty(key)) {
      document.querySelector("#toppings").innerHTML += `<p id=${key} class = 'pizza-toppings'> ${key} $${toppings[key]} each <select name = "topping-qty" id=${key}-qty class = "topping-qty"><option value="">-- Choose Quantity --</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></p>`;
    }
  }

  for (const key in sides) {
    if (sides.hasOwnProperty(key)) {
      document.querySelector("#sides").innerHTML += `<p id=${key} class = 'pizza-sides'> ${key} $${sides[key]} each <select name = "sides-qty" id=${key}-qty class = "sides-qty"><option value="">-- Choose Quantity --</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></p>`;
    }
  }

  for (const key in drinks) {
    if(drinks.hasOwnProperty(key)) {
      document.querySelector("#drinks").innerHTML += `<p id=${key} class = 'pizza-drinks'> ${key} $${drinks[key]} each <select name = "drinks-qty" id=${key}-qty class = "drinks-qty"><option value="">-- Choose Quantity --</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></p>`;
      if (typeof(drinks[key] == 'object')) {
        document.querySelector(".pizza-drinks:first-child").innerHTML = `${Object.keys(drinks)[0]} <br>`;
         
        //add 'soda' and a drop down that says all sizes, another dropdown that adds price and along with all the others a dropdown that says quantity.
        
        for (const key in soda) {
          if (soda.hasOwnProperty(key)) {
            document.querySelector(".pizza-drinks:first-child").innerHTML += `<span class = 'drink-size'> ${key} $${soda[key]} </span> <select name = "size-qty" id=${key}-qty class = "size-qty"><option value="">-- Choose Quantity --</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select><br>`; //indent drink-size css
          }
        }
      }
    }
  }
}

getMenu();

function saveOrder() {
  const order = {
    slices: document.querySelector('#slice-qty').value,
    pepperoni: document.querySelector('#pepperoni-qty.topping-qty').value,
    meatball: document.querySelector('#meatballs-qty.topping-qty').value,
    mushroom: document.querySelector('#mushrooms-qty.topping-qty').value,
    olive: document.querySelector('#olives-qty.topping-qty').value,
    potatoSalad: document.querySelector('#potato.sides-qty').value,
    hummus: document.querySelector('#hummus-qty.sides-qty').value,
    caesarSalad: document.querySelector('#caesar.sides-qty').value,
    gardenSalad: document.querySelector('#garden.sides-qty').value,
    smallSoda: document.querySelector('#small-qty.size-qty').value,
    mediumSoda: document.querySelector('#medium-qty.size-qty').value,
    largeSoda: document.querySelector('#large-qty.size-qty').value,
    juice: document.querySelector('#juice-qty.drinks-qty').value,
    water: document.querySelector('#water-qty.drinks-qty').value,
  };

  localStorage.setItem('order', JSON.stringify(order));
  document.getElementById('save-button').innerHTML = `<button id = "show-button" type="button" name="show-order" onclick="showOrder()">See Your Order</button>`;
}

function showOrder() {
  const order = JSON.parse(localStorage.getItem('order'));
  const orderPrices = {
    slicePrice() {return order.slices * 2;},
    pepperoniPrice() {return order.pepperoni * 0.25;},
    meatballPrice() {return order.meatball * 0.35;},
    mushroomPrice() {return order.mushroom * 0.40;},
    olivePrice() {return order.olive * 0.20;},
    potatoSaladPrice() {return order.potatoSalad * 1.25;},
    hummusPrice() {return order.hummus * 2.50;},
    caesarSaladPrice() {return order.caesarSalad * 3.50;},
    gardenSaladPrice() {return order.gardenSalad * 2.25;},
    smallSodaPrice() {return order.smallSoda * 1.95;},
    mediumSodaPrice() {return order.mediumSoda * 2.20;},
    largeSodaPrice() {return order.largeSoda * 2.50;},
    juicePrice() {return order.juice * 2;},
    waterPrice() {return order.water * 1.25;},
    totalPrice() {return orderPrices.slicePrice() + orderPrices.pepperoniPrice() + orderPrices.meatballPrice() + orderPrices.mushroomPrice() + orderPrices.olivePrice() + orderPrices.potatoSaladPrice() + orderPrices.hummusPrice() + orderPrices.caesarSaladPrice() + orderPrices.gardenSaladPrice() + orderPrices.smallSodaPrice() + orderPrices.mediumSodaPrice() + orderPrices.largeSodaPrice() + orderPrices.juicePrice() + orderPrices.waterPrice();}
  }
  let content = '<h3>You Ordered: </h3>';
  const total = orderPrices.totalPrice().toFixed(2);
  const priceMessage = `<h3>Your Total Comes To: $${total} </h3`
  
  for (x in order) {
    if (order.hasOwnProperty(x) && order[x] > 0) {
      content += `<h4> ${order[x]} orders of ${x} </h4>`
  }
}
document.getElementById('stored-order').innerHTML = content + priceMessage;
}
