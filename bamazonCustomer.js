const mysql = require("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(error) {
    if (error) {
        throw error;
    };
});

function selectItem() {
    inquirer
        .prompt([
        {
            item_id: "item_id",
            type: "input", 
            message: "What is the item id for the product you'd like to purchase?"
        }, 
        {
            quantity: "quantity",
            type: "input", 
            message: "What quantity would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
            }
        }
    ])
    .then(function(answer) {

        let purchasedQuantity = answer.quantity; 

        // If quantity is greater than or equal to the purchasedQuantity, fullfill the order. 
        if (purchasedQuantity >= stock_quantity) {
            console.log("This order can be filled.")
        }
        else {
            console.log("Insufficient Quantity!")
        }

    });
        
}

function itemExists() {

    // Check to see if the product the user chose exists in the inventory
function checkInventory(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].item_id === choiceId) {
        // If a matching product is found, return the product
        return inventory[i];
      }
    }
    // Otherwise return null
    return null;
  }
}

// Prompt the customer for a product quantity
function promptCustomerForQuantity(product) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "quantity",
          message: "How many would you like? [Quit with Q]",
          validate: function(val) {
            return val > 0 || val.toLowerCase() === "q";
          }
        }
      ])
      .then(function(val) {
        // Check if the user wants to quit the program
        checkIfShouldExit(val.quantity);
        var quantity = parseInt(val.quantity);
        // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
        if (quantity > product.stock_quantity) {
          console.log("\nInsufficient quantity!");
          loadProducts();
        }
        else {
          // Otherwise run makePurchase, give it the product information and desired quantity to purchase
          makePurchase(product, quantity);
        }
      });
  }

selectItem();