import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      minlength: 5,
    },
    userId: {
      type: String,
      default: null, // allow guest users
    },
  },
  {
    timestamps: true, // better than manual createdAt
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;