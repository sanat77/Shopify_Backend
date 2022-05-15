import fetch from "node-fetch";

// creates a shipment and adjusts the inventory count on the database.
//  Returns -1 if the required shipment count is greater than the inventory available
// conditions: requiredItemId is valid
//             requiredNumberOfItems is greater than 0
const shipment = async (requiredItemId, requiredNumberOfItems) => {

    // get item details
    const url = `http://localhost:3000/item/?id=${requiredItemId}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
        return;
    }

    const itemToOrder = await response.json();
    const numberOfItemsAvailabe = itemToOrder.count;
    
    // check if inventory has enough items to order
    if (numberOfItemsAvailabe < requiredNumberOfItems) {
        console.log("Not enough items!!");
        return -1;
    }

    // create a shipment
    const shipment = {
        itemId: itemToOrder.id,
        itemName: itemToOrder.name,
        itemCount: requiredNumberOfItems
    }

    // adjust the inventory in the database appropriately
    const patchRequestResponse = await fetch(`http://localhost:3000/item`, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            "id": requiredItemId,
            "count": numberOfItemsAvailabe - requiredNumberOfItems
        })
    })

    if (!patchRequestResponse.ok) {
        throw new Error(`Couldn't update the database. Request failed with status ${response.status}`);
        return;
    }

    return shipment;
};

shipment(1, 4);