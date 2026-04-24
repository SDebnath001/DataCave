import Message from "../models/Message.js";

// Create message
export const createMessage = async (req, res) => {
  try {
    const { name, email, message, userId } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Message({
      name,
      email,
      message,
      userId: userId || null,
    });

    await newMessage.save();

    res.status(201).json({ msg: "Message saved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get messages (user or admin)
export const getMessages = async (req, res) => {
  try {
    const { userId, email } = req.query;

    let messages;

    // 🔴 ADMIN → sees all messages
    if (email?.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase()) {
      messages = await Message.find().sort({ createdAt: -1 });
    } 
    // 🔵 NORMAL USER → only their messages
    else {
      messages = await Message.find({
        $or: [
          userId && { userId },
          { email }
        ].filter(Boolean)
      }).sort({ createdAt: -1 });
    }

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Honestly saying this part is done by chatGPT for better understanding of the logic. cause why not when we have AI. still learining.
//Ak1MdZeOqbT7EEmL : password of the DB
//debnathsubham957_db_user