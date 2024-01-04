const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://gagandaman0:lv4Kqo2QPfjX6vL8@cluster0.0beqpny.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
