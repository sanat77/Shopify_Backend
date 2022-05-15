const express = require("express");
// add different schema for new warehouse (this is just an instance for Warehouse 1)
const Warehouse1Model = require("./models/schema");
const app = express();

// post request to add item
app.post("/", async (request, response) => {
    const name = request.body.name;
    const id = request.body.id;
    const data = {id: id, name: name};

    try {
        const item = new Warehouse1Model(data);
        await item.save();
        console.log(`user saved: ${item}`);
        response.status(200).send(item);
    } catch (error) {
        console.log(`user not saved, error: ${error}`);
        response.status(500).send(error);
    }
});

// get request to get one item
// id should be present in url
app.get("/item", async(request, response) => {
    const item = await Warehouse1Model.findOne({id: request.query.id});
    try {
        response.status(200).send(item);
    } catch (error) {
        response.status(500).send(error);
    }
});

// get request to get all items
app.get("/", async (request, response) => {
    const items = await Warehouse1Model.find({});
    try {
        response.send(items);
    } catch (error) {
        response.status(500).send(error);
    }
});

// update the number of item selected
app.patch("/item", async(request, response) => {
    const id = request.body.id;
    const count = request.body.count;
    try {
        const item = await Warehouse1Model.findOneAndUpdate({id: id}, {count: count});
        await item.save();
        console.log(`id: ${id} count: ${count}`);
        response.status(200).send();
    } catch (error) {
        response.status(500).send(error);
    }
});

// delete the item selected
app.delete("/itemId", async(request, response) => {
    const id = request.body.id;
    try {
        const item = await Warehouse1Model.findOneAndDelete({id: id});
        await item.save();
        console.log(`id: ${id}`);
        response.status(200).send(item);
    } catch (error) {
        response.status(500).send(error);
    }
});

// delete all
app.delete("/", async(request, response) => {
    try {
        const item = await Warehouse1Model.deleteMany({});
        await item.save();
        response.status(200).send(item);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;