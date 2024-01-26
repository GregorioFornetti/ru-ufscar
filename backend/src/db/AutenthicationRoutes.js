import express, { Router } from "express";
import { login, logout } from './AuthenticationController.js'

const router = Router()
      .post(`/login`, express.urlencoded({ extended: false }), login)
      .get(`/logout`, logout)

export default router