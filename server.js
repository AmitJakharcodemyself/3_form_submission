const express=require('express')
const app=express()
const db=require('./db')
const port =process.env.PORT || 4444

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set("view engine", "hbs")

//store all inputs values of all 3 forms in global List in order id,name,dob,nationality,mart_status,edu.
let data_list=[]//empty list
let i=0;

app.get('/',function(req,res){
   // res.send('Hello From Backend')


   db.getAllPersons().then(function(persons){
    res.render('submit',{
        persons
    })
}).catch(function(err){
    res.send(err)
})



})

//submit
app.get('/submit',function(req,res){
    db.getAllPersons().then(function(persons){
        res.render('submit',{
            persons
        })
    }).catch(function(err){
        res.send(err)
    })
})


//form1-> get and post both requests
app.get('/form1',function(req,res){
res.render('form1')
})
app.get('/form2',function(req,res){
    res.render('form2')
})
app.get('/form3',function(req,res){
    res.render('form3')
})

app.post('/form1',function(req,res){
    //data_list.append(req.body.id)
    //data_list.append(req.body.name)
    data_list[i++]=req.body.id;
   // console.log(data_list[0])
    data_list[i++]=req.body.name;
    res.render('form2')
})

//form2-> both get and post requests
app.post('/form2',function(req,res){
   // data_list.append(req.body.DOB)
   // data_list.append(req.body.Nationality)
   data_list[i++]=req.body.DOB;
   data_list[i++]=req.body.Nationality;
   

    res.render('form3')
})

//form 3

app.post('/form3',function(req,res){
 //   data_list.append(req.body.Marital_st)
  //  data_list.append(req.body.Education)

  data_list[i++]=req.body.Marital_st;
  data_list[i++]=req.body.Education;
    //send data_list till now to database and then render to sybmit .html
    db.addNewPerson(data_list[0],data_list[1],data_list[2],data_list[3],data_list[4],data_list[5])
    .then(function(){
        res.redirect('/')
        //res.render('submit',{
          //  data_list
       // })
      // res.render('submmit')
    })
    .catch(function(err){
        res.send(err)
    })
})
// submit


app.listen(port,function(){
    console.log('server at port')
})

module.exports={
    data_list
}