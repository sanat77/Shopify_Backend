const mongoose = require("mongoose");

const Warehouse1Schema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    }
});

const Warehouse1 = mongoose.model("warehouse1", Warehouse1Schema);

module.exports = Warehouse1;