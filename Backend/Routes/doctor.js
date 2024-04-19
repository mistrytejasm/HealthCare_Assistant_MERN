import express from "express"
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
} from '../Controllers/doctorController.js';
import { authenticate,restrict } from "../auth/verifyToken.js";

const doctorRoute = express.Router();

doctorRoute.get("/:id", getSingleDoctor);
doctorRoute.get("/", getAllDoctor);
doctorRoute.put("/:id",authenticate, restrict(['doctor']),updateDoctor);
doctorRoute.delete("/:id", authenticate, restrict(['doctor']),deleteDoctor);

export default doctorRoute;