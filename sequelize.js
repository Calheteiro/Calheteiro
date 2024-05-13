//    requirements    //
const express=require('express');
const mysql=require('mysql2');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize_instance = new Sequelize('ficha10', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize_instance.authenticate()
.then(() => {
    console.log("conected :)");
})
.catch(() => {
    console.log("something went wrong D:", err);
});
//    models in paper    //
const BookDataModel=require('./models/Book.js');
const UserDataModel=require('./models/User.js');
const LoanDataModel=require('./models/Loan.js');
//    models    //
const Book=BookDataModel(sequelize_instance, DataTypes);
const User=UserDataModel(sequelize_instance, DataTypes);
const Loan=LoanDataModel(sequelize_instance, DataTypes);
//    relations    //
User.hasMany(Loan, {foreignKey:'user_id'});
Loan.belongsTo(User, {foreignKey:'user_id'});
Book.hasMany(Loan, {foreignKey:'book_id'});
Loan.belongsTo(Book, {foreignKey:'book_id'});
//    sync with DB    //
sequelize_instance.sync({force:false})
    .then(()=>{
        console.log("tables created");
    });

module.exports={User, Book, Loan};