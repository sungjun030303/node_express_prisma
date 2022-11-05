const { Router } = require('express')
const { PrismaClient } = require('@prisma/client')
const { userResponse } = require('../select')

const router = Router();
const prisma = new PrismaClient();

module.exports = { router };