require("dotenv").config();
const { AUTH_TOKEN_SALT } = process.env
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { dateForm } = require('../utils')
const { ProjectService, UserService, LikeService, ApplyService } = require('../services')
const { errorWrapper, errorGenerator } = require('../errors')


const getProjects = errorWrapper(async(req, res) => {
    const projectList = await ProjectService.findProjects(req.query)
    res.status(200).json({ projectList })
})

const getOneProject = errorWrapper(async(req, res) => {
    const userInfofromToken = req.foundUser ? req.foundUser : undefined
    const isStartup = userInfofromToken.type_id === 1
    const findApplied = isStartup ? await ApplyService.findRelatedApplication({ companies: userInfofromToken.company_id }) : false
    const hasApplied = findApplied ? true : false
    const { projectId } = req.params
    const projectDetail = await ProjectService.findOneProject({ id: projectId })

    res.status(200).json({ projectDetail, hasApplied })
})

const postOneProject = errorWrapper(async(req, res) => {
    const userInfofromToken = req.foundUser

    const requestedFields = req.body
    const project_picture = req.file ? req.file.location : undefined;
    const required_documents = requestedFields.required_documents
    const due_date = await dateForm(requestedFields.due_date)
    const projectAction = await ProjectService.createProject({ userInfofromToken, requestedFields, project_picture, due_date })
    for (len = 0; len < required_documents.length; len++) {
        await ProjectService.createRelatedDoc({ required_documents, projectAction })
    }
    res.status(201).json({ message: 'information successfully added' })
})

const updateOneProject = errorWrapper(async(req, res) => {
    const { projectId } = req.params
    const userInfofromToken = req.foundUser
    const requestedFields = req.body
    const project_picture = req.file ? req.file.location : null;
    const required_documents = requestedFields.required_documents
    const due_date = await dateForm(requestedFields.due_date)

    const foundProject = await ProjectService.findOneProject({ id: projectId })
    if (!foundProject) errorGenerator({ statusCode: 404, message: 'project not found' })
    const { host: companyIdfromProject } = foundProject

    if (userInfofromToken.company_id !== companyIdfromProject)
        errorGenerator({ statusCode: 403, message: 'unauthorized' })

    const projectAction = await ProjectService.updateProject({ projectId, requestedFields, project_picture, due_date })
    await ProjectService.resetChoices({ projectAction })
    for (len = 0; len < required_documents.length; len++) {
        await ProjectService.createRelatedDoc({ required_documents, projectAction })
    }
    res.status(201).json({ message: 'information successfully updated' })
})

const openOneProject = errorWrapper(async(req, res) => {
    const { projectId } = req.params
    const userInfofromToken = req.foundUser

    const foundProject = await ProjectService.findOneProject({ id: projectId })
    if (!foundProject) errorGenerator({ statusCode: 404, message: 'project not found' })

    if (userInfofromToken.type_id !== 3)
        errorGenerator({ statusCode: 403, message: 'unauthorized' })

    const projectPublish = await ProjectService.openProject(projectId)
    res.status(201).json({ message: 'information successfully opened' })
})

const deleteOneProject = errorWrapper(async(req, res) => {
    const { projectId } = req.params
    const userInfofromToken = req.foundUser

    const foundProject = await ProjectService.findOneProject({ id: projectId })
    if (!foundProject) errorGenerator({ statusCode: 404, message: 'project not found' })
    const { host: companyIdfromProject } = foundProject

    if ((userInfofromToken.company_id == companyIdfromProject) || (userInfofromToken.type_id == 3)) {
        await ProjectService.deleteProject(projectId)
        res.status(201).json({ message: 'information successfully deleted' })
    } else errorGenerator({ statusCode: 403, message: 'unauthorized' })
})

const likeProject = errorWrapper(async(req, res) => {
    const { projectId } = req.params
    const userId = req.foundUser.id
    const where = {
        user_id: Number(userId),
        company_id: Number(projectId)
    }
    const data = {
        users: { connect: { id: Number(userId) } },
        companies: { connect: { id: Number(projectId) } },
    }
    const like = await LikeService.like('project_likes', where, data)
    res.status(201).json({
        message: 'Project Like Updated',
        result: like.is_liked
    })
})

module.exports = {
    getProjects,
    getOneProject,
    postOneProject,
    updateOneProject,
    openOneProject,
    deleteOneProject,
    likeProject
}