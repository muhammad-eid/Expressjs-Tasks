const fs = require('fs')
const DB = './DB.json'

const ReadTasksDB = (db=DB)=>{
    let tasks
    try{tasks = JSON.parse(fs.readFileSync(DB))}
    catch(e){ tasks = [] }
    return tasks
}

const WriteTaskDB = (tasks, db=DB)=>{
    //let tasks = ReadTasksDB(db)
    //try{tasks.push({task})}
    //catch(e){ tasks = [] }
    fs.writeFileSync(db, JSON.stringify(tasks))
}

class Task{
    static home = (req, res)=>{
        let tasks = ReadTasksDB()
        // console.log(tasks)
        res.render('home', {tasks})
    }

    static show = (req, res)=>{
        let task = ReadTasksDB().find(task=>task.id==req.params.id)
        console.log(task);
        res.render('show', {task})
    }

    static changeStatus = (req, res)=>{
        let tasks = ReadTasksDB()
        let status = tasks[tasks.findIndex(item=> item.id == req.params.id)].status
        // console.log(req.params.id)
        // console.log(tasks.find(item => item.id == req.params.id))
        tasks[tasks.findIndex(item=> item.id == req.params.id)].status = !status
        WriteTaskDB(tasks)
        res.redirect('/')
    }

    static add =(req, res)=>{
        let taskData = {
            form:{
                route:"/addPost",
                name:"",
                title:"",
                content:"",
                btn:"Add User"
            }
        }
        res.render('add', taskData)
    }
    static addPost =(req, res)=>{
        let tasks = ReadTasksDB()
        tasks.push({id:Date.now() , ...req.body})
        WriteTaskDB(tasks)
        res.redirect('/')
    }
    static edit =(req, res)=>{
        let tasks = ReadTasksDB()
        let task = tasks.findIndex(task=> task.id==req.params.id) 
        let taskData = {
            form:{
                route:`/editPost/${tasks[task].id}`,
                name:tasks[task].name,
                title:tasks[task].title,
                content:tasks[task].content,
                btn:"Edit User"
            }
        }
        res.render('add', taskData)   
    }
    static editPost =(req, res)=>{
        let tasks = ReadTasksDB()
        tasks[tasks.findIndex(task=>task.id==req.params.id)].name = req.body.name
        tasks[tasks.findIndex(task=>task.id==req.params.id)].title = req.body.title
        tasks[tasks.findIndex(task=>task.id==req.params.id)].content = req.body.content
        WriteTaskDB(tasks)
        res.redirect('/')
    }
    static delete =(req, res)=>{
        let tasks = ReadTasksDB()
        tasks.splice(tasks.findIndex(task=> task.id==req.params.id), 1)
        WriteTaskDB(tasks)
        console.log('delete')
        res.redirect('/')
    }

}

module.exports = Task