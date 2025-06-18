import mongoose from "mongoose";

const TestSchema = new mongoose.schema({
  field1: { type: String, required: true },
  field2: { type: Number, required: true },
});

const Test = mongoose.model("Test", TestSchema);
export default Test;
