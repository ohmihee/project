// const Sequelize = require('sequelize');
// const moment = require('moment');

module.exports ={
    history:class History extends Sequelize.Model{
        static init(sequelize){
            return super.init({
                currentCash:{
                    type:Sequelize.INTEGER(10),
                    allowNull:false,
                },
                totalCash:{
                    type:Sequelize.INTEGER(10),
                    allowNull:false,
                },
                totalCoin:{
                    type:Sequelize.INTEGER(10),
                    allowNull:false,
                }
            },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            Modelname:'History',
            tablename:'histories',
            charset:'utf8',
            collate:'utf8_general_ci'
            })
        }
    },
    content:class Content extends Sequelize.Model{
        static init(sequelize){
            return super.init({
                buyTime:{
                    type:Sequelize.DATEONLY,
                    allowNull:false,        
                    defaultValue:Sequelize.NOW(),
                    get:function(){
                        return moment(this.getDataValue('buyTime')).format('YYYY-MM-DD-HH-mm-ss')
                    }            
                },
                coin:{
                    type:Sequelize.STRING(20),
                    allowNull:false,
                },
                order:{
                    type:Sequelize.BOOLEAN,
                    allowNull:false,
                    //defaultValue:'미체결'
                },
                volume:{
                    type:Sequelize.STRING(10),
                    allowNull:false,
                },
                finalPrice:{
                    type:Sequelize.STRING(10),
                    allowNull:false,

                },
                finalCost:{
                    type:Sequelize.STRING(10),
                    allowNull:false,
                },
                status:{
                    type:Sequelize.BOOLEAN,
                    allowNull:false,
                }

            },{
                sequelize,
                timestamps:false,
                underscored:false,
                paranoid:false,
                Modelname:'Content',
                tablename:'contents',
                charset:'utf8',
                collate:'utf8_general_ci'
            })
        }
    }
    
    
}