import Residue from './Residue.js'

var residues


async function getCurrentResidues() {
    if (!categories) {
        residues = await Residue.findAll({
            attributes: ['id', 'type', 'date', 'preparationResidues', 'plateRemainsResidues', 'counterRemainsResidues', 'preparedFood']
        })
        residues = residues.map((residue) => ({
            id: Number(residue.id),
            type: residue.type,
            date: residue.date,
            preparationResidues: residue.preparationResidues,
            plateRemainsResidues: residue.plateRemainsResidues,
            counterRemainsResidues: residue.counterRemainsResidues,
            preparedFood: residue.preparedFood
        }))
    }
    return residues
}

function resetResidues() {
    residues = null
}


export async function getResidues(req, res) {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    var resultResidues

    try {
        const residues = await getCurrentResidues()
        if (!startDate || !endDate) {
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


        if (residuesByStartEndDates.length > 0) {
            res.status(200).json(resultResidues)
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
            res.status(200).json(residue)
        } else {
            res.status(404).json({ message: 'Residue not found!' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getCurrentResiduesByStartEndDates(req, res) {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    try {
        const residues = await getCurrentResidues()
        const residuesByStartEndDates = residues.filter((residue) => residue.date >= startDate && residue.date <= endDate)
        if (residuesByStartEndDates.length > 0) {
            res.status(200).json(residuesByStartEndDates)
        } else {
            res.status(404).json({ message: 'Residues not found!' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function createResidue(req, res) {
    try {
        const newResidue = await Residue.create(req.body)

        resetCategories()
        return res.status(200).json({
            id: Number(newResidue.id), 
            type: newResidue.type,
            date: newResidue.date,
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
            const updatedResidue = await Residue.update(req.body, {
                where: {
                    id: id
                }
            })

            resetResidues()
            res.status(200).json({
                id: Number(id),
                type: req.body.type,
                date: req.body.date,
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