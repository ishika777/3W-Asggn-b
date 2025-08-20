import User from "../models/user.model.js";
import History from "../models/history.model.js";

// Claim random points for a user
export const claimPoints = async (req, res) => {
  try {
    const { fromUserId, toUserId, points } = req.body;

    // Validate
    if (!fromUserId || !toUserId || !points) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    if (fromUserId === toUserId) {
      return res.status(400).json({ success: false, message: "Cannot claim from yourself" });
    }

    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Ensure claim is valid
    const maxClaimable = Math.min(10, fromUser.totalPoints);
    if (points < 1 || points > maxClaimable) {
      return res.status(400).json({ 
        success: false, 
        message: `Invalid claim. Can claim between 1 and ${maxClaimable} points.` 
      });
    }

    // Apply changes
    fromUser.totalPoints -= points;
    toUser.totalPoints += points;

    await fromUser.save();
    await toUser.save();

    // Record history
    const newHistory = new History({
      from: toUserId,
      to: fromUserId,
      points
    });
    await newHistory.save();

    const updatedUsers = await User.find().sort({ createdAt: -1 });
    const historyList = await History.find().populate("from to").sort({ createdAt: -1 });

    return res.status(201).json({
      success: true,
      message: "Points claimed successfully",
      users: updatedUsers,
      newHistory: historyList,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
