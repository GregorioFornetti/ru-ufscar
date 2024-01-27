
import Residue from './Residue.js'
import { ISOStringToDate, ISODateToBrazilianDateString, isISOString, ISODateStringToBrazilianDateString } from './dateUtils.js'

var residues

async function getCurrentResidues() {
    if (!residues) {
        residues = await Residue.findAll({
            attributes: ['id', 'type', 'date', 'preparationResidues', 'plateRemainsResidues', 'counterRemainsResidues', 'preparedFood']
        })
        residues = residues.map((residue) => ({
            id: Number(residue.id),
            type: residue.type,
            date: ISOStringToDate(residue.date),
            formatedDate: ISODateStringToBrazilianDateString(residue.date),
            preparationResidues: residue.preparationResidues,
            plateRemainsResidues: residue.plateRemainsResidues,
            counterRemainsResidues: residue.counterRemainsResidues,
            preparedFood: residue.preparedFood
        }))
    }
    return residues
}

residues = await getCurrentResidues()

function residuesToJSON(residues) {
    return residues.map((residue) => ({
        id: Number(residue.id),
        type: residue.type,
        date: residue.formatedDate,
        preparationResidues: residue.preparationResidues,
        plateRemainsResidues: residue.plateRemainsResidues,
        counterRemainsResidues: residue.counterRemainsResidues,
        preparedFood: residue.preparedFood
    }))
}

function resetResidues() {
    residues = null
}

function verifyResidue(residueBody, residues, id) {
    // if is a valid residue, return [true, residue]
    // if is a invalid residue, return [false, { message: ... }]

    if (!residueBody.type) {
        return [false, { message: 'Residue type is required!' }]
    }

    if (!residueBody.date) {
        return [false, { message: 'Date is required!' }]
    }

    if (!residueBody.preparationResidues) {
        return [false, { message: 'Preparation residues is required!' }]
    }

    if (!residueBody.plateRemainsResidues) {
        return [false, { message: 'Plate remains residues is required!' }]
    }

    if (!residueBody.counterRemainsResidues) {
        return [false, { message: 'Counter remains residues is required!' }]
    }

    if (!residueBody.preparedFood) {
        return [false, { message: 'Prepared food is required!' }]
    }

    const residue = {
        type: residueBody.type.toLowerCase(),
        date: residueBody.date,
        preparationResidues: residueBody.preparationResidues,
        plateRemainsResidues: residueBody.plateRemainsResidues,
        counterRemainsResidues: residueBody.counterRemainsResidues,
        preparedFood: residueBody.preparedFood
    }
    const date = ISOStringToDate(residue.date).toDateString()

    if (residues.some((curResidue) => {
        if (curResidue.id === id) {
            return false
        }
        return curResidue.type === residue.type && curResidue.date.toDateString() === date
    })) {
        return [false, { message: 'Residue already exists!' }]
    }

    if (residue.type !== 'almoço' && residue.type !== 'jantar') {
        return [false, { message: 'Invalid residue type!' }]
    }

    if (!isISOString(residue.date)) {
        return [false, { message: 'Invalid date!' }]
    }

    if (typeof residue.preparationResidues !== 'number' || residue.preparationResidues < 0) {
        return [false, { message: 'Invalid preparation residues!' }]
    }

    if (typeof residue.plateRemainsResidues !== 'number' || residue.plateRemainsResidues < 0) {
        return [false, { message: 'Invalid plate remains residues!' }]
    }

    if (typeof residue.counterRemainsResidues !== 'number' || residue.counterRemainsResidues < 0) {
        return [false, { message: 'Invalid counter remains residues!' }]
    }

    if (typeof residue.preparedFood !== 'number' || residue.preparedFood < 0) {
        return [false, { message: 'Invalid prepared food!' }]
    }

    return [true, residue]
}


export async function getResidues(req, res) {
    const startDateString = req.query.startDate
    const endDateString = req.query.endDate
    var resultResidues

    if (startDateString && !isISOString(startDateString)) {
        return res.status(400).json({ message: 'Invalid startDate!' })
    }

    if (endDateString && !isISOString(endDateString)) {
        return res.status(400).json({ message: 'Invalid endDate!' })
    }

    const startDate = startDateString ? ISOStringToDate(startDateString) : null
    const endDate = endDateString ? ISOStringToDate(endDateString) : null

    if (startDate && endDate && startDate > endDate) {
        return res.status(400).json({ message: 'Invalid date range!' })
    }

    try {
        const residues = await getCurrentResidues()
        if (!startDate && !endDate) {
            // Return all residues
            resultResidues = await getCurrentResidues()
        } else if (!startDate && endDate) {
            // Return residues until endDate
            resultResidues = residues.filter((residue) => residue.date <= endDate)
        } else if (startDate && !endDate) {
            // Return residues from startDate
            resultResidues = residues.filter((residue) => residue.date >= startDate)
        } else {
            // Return residues between startDate and endDate
            resultResidues = residues.filter((residue) => residue.date >= startDate && residue.date <= endDate)
        }

        if (resultResidues.length > 0) {
            res.status(200).json(residuesToJSON(resultResidues))
        } else {
            res.status(404).json({ message: 'Residues not found!' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getResidueById(req, res) {
    const id = req.params.id
    try {
        const residues = await getCurrentResidues()
        const residue = residues.find((residue) => residue.id === Number(id))
        if (residue) {
            res.status(200).json(residuesToJSON([residue])[0])
        } else {
            res.status(404).json({ message: 'Residue not found!' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function createResidue(req, res) {
    try {
        const residueInfo = verifyResidue(req.body, await getCurrentResidues())
        if (!residueInfo[0]) {
            return res.status(400).json(residueInfo[1])
        }
        const residue = residueInfo[1]
        const newResidue = await Residue.create(residue)

        resetResidues()
        return res.status(200).json({
            id: Number(newResidue.id), 
            type: newResidue.type,
            date: ISODateStringToBrazilianDateString(newResidue.date),
            preparationResidues: newResidue.preparationResidues,
            plateRemainsResidues: newResidue.plateRemainsResidues,
            counterRemainsResidues: newResidue.counterRemainsResidues,
            preparedFood: newResidue.preparedFood
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateResidue(req, res) {
    const id = req.params.id
    try {
        const residues = await getCurrentResidues()
        const residue = residues.find((residue) => residue.id === Number(id))

        if (residue) {
            const residueInfo = verifyResidue(req.body, residues, id)
            if (!residueInfo[0]) {
                return res.status(400).json(residueInfo[1])
            }
            const residue = residueInfo[1]
            const updatedResidue = await Residue.update(residue, {
                where: {
                    id: id
                }
            })

            resetResidues()
            res.status(200).json({
                id: Number(id),
                type: req.body.type,
                date: ISODateStringToBrazilianDateString(req.body.date),
                preparationResidues: req.body.preparationResidues,
                plateRemainsResidues: req.body.plateRemainsResidues,
                counterRemainsResidues: req.body.counterRemainsResidues,
                preparedFood: req.body.preparedFood
            })
        } else {
            res.status(404).json({ message: 'Residue not found!' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteResidue(req, res) {
    const id = req.params.id
    try {
        const residues = await getCurrentResidues()
        const residue = residues.find((residue) => residue.id === Number(id))

        if (residue) {
            await Residue.destroy({
                where: {
                    id: id
                }
            })

            resetResidues()
            res.status(200).json({ message: 'Residue deleted!' })
        } else {
            res.status(404).json({ message: 'Residue not found!' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}