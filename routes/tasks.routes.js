const router = require('express').Router()
const Task = require('../controller/tasks.controller')

router.get('/', Task.home)

router.get('/show/:id', Task.show)


router.get('/add', Task.add)
router.post('/addPost', Task.addPost)

router.get('/changeStatus/:id', Task.changeStatus)

router.get('/edit/:id', Task.edit)
router.post('/editPost/:id', Task.editPost)

router.get('/delete/:id', Task.delete)


module.exports = router