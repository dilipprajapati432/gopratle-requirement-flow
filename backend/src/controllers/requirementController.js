import Requirement from "../models/Requirement.js";

export async function createRequirement(req, res, next) {
  try {
    const requirement = await Requirement.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Requirement created successfully",
      data: {
        id: requirement._id,
        category: requirement.category,
        createdAt: requirement.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function getRequirement(req, res, next) {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: "Requirement not found"
      });
    }

    return res.json({
      success: true,
      data: requirement
    });
  } catch (error) {
    next(error);
  }
}
