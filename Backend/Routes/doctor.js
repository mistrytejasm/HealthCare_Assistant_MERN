import express from "express"
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getDoctorProfile,
} from '../Controllers/doctorController.js';
import { authenticate,restrict } from "../auth/verifyToken.js";
import reviewRouter from './review.js';

const doctorRoute = express.Router();

// nested route
doctorRoute.use("/:doctorId/reviews", reviewRouter);

doctorRoute.get("/:id", getSingleDoctor);
doctorRoute.get("/", getAllDoctor);
doctorRoute.put("/:id",authenticate, restrict(['doctor']),updateDoctor);
doctorRoute.delete("/:id", authenticate, restrict(['doctor']),deleteDoctor);

doctorRoute.get('/profile/me', authenticate, restrict(['doctor']),getDoctorProfile)

export default doctorRoute;