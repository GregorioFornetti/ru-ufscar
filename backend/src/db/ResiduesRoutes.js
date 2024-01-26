import { Router } from "express";
import checkAuthentication from './auth.js'
import { getResidues, getResidueById, createResidue, updateResidue, deleteResidue } from "./ResidueController.js";

const router = Router()
const residuesPath = 'residues'

router.get(`/${residuesPath}`, getResidues)
      .get(`/${residuesPath}/:id`, getResidueById)
      .post(`/${residuesPath}`, checkAuthentication, createResidue)
      .put(`/${residuesPath}/:id`, checkAuthentication, updateResidue)
      .delete(`/${residuesPath}/:id`, checkAuthentication, deleteResidue)

export default router