import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js";


export async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    const hashPass = await bcrypt.hash(password, 10);
    const emailCheck = await User.findOne({ email })
    if (emailCheck) {
      return res.status(400).json({ message: "Email already in use" })
    }
    const user = await User.create({
      name,
      email,
      password: hashPass
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(201).send({ message: "User created successfully and logged in", token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error while signup on server", error: error.message });
  }
}


export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) {
      return res.status(401).send({ message: "Wrong password!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).send({ message: "Logged in successfully!", token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error while logging in on server!", error: error.message });
  }
}


export async function updateUser(req, res) {
  const { id } = req.user || {};
  const { name, email, password } = req.body;

  try {
    if (!id) {
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }
    const updateData = {};
    if (name) updateData.name = name;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    if (email) {
      updateData.email = email;
    }
    const updatedUser = await User.findByIdAndUpdate(id, updateData);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function verifyUser(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user })
  } catch (err) {
    console.error("Error verifying user:", err);
    res.status(500).json({ error: "Server error" });
  }
}