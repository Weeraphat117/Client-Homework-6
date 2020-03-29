let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

app.use('/api', bodyParser.json(), router);
app.use('/api', bodyParser.urlencoded({extended: false}), router);

let students = [{
    id:0,
    stdId:'5735512117',
    name:'Weeraphat',
    surname:'Kittitrirat',
    Major:'CoE',
    GPA:2.00
}]

router.route('/student')
    .get((req, res) => {
        res.json(students)
    })
    .post((req, res) => {
        var student = {}
        student.id = students.length+1
        student.stdId = students.stdId,
        student.name = req.body.name
        student.suname = req.body.surname,
        student.Major = req.body.Major,
        student.GPA = req.body.GPA
        students.push(student)
        res.json({
            message:'Create!',
            students
        })
    })

router.route('/student/:id')
    .get((req, res) => {
        var params = req.params
        res.json(students[params.id])
    })
    .put((req, res) => {
        var id = req.params.id
        students[id].stdId = req.body.stdId
        students[id].name = req.body.name
        students[id].surname = req.body.surname
        students[id].Major = req.body.Major
        students[id].GPA = req.body.GPA
        res.json({
            message:'updated!'
        })
    })
    .delete((req, res) => {
        var params = req.params
        var id = params.id
        delete students[id]
        res.json({
            message:'deleted!'
        })
    })

app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(8000,  () => console.log("Server is running") );