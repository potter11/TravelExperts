const mongoose = require("mongoose");
const agentSchema = new mongoose.Schema({
    AgentId: Number,
    AgtFirstName: String,
    AgtLastName: String,
    AgtBusPhone: String,
    AgtEmail: String,
    AgtPosition: String,
    AgencyId: Number,
  });
  const Agent = new mongoose.model("Agent", agentSchema);

  module.exports = Agent;