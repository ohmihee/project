const Sequelize = require('sequelize');


module.exports = class Item extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name:{
                type:Sequelize.STRING(30),
                allowNull:false,
                unique:true,
                primaryKey:true,
            },
            price:{
                type:Sequelize.INTEGER(10),
                allowNull:false,
            },
            volume:{
                type:Sequelize.INTEGER(10),
                allowNull:false
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            Modelname:'Itme',
            tablename:'items',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }

}