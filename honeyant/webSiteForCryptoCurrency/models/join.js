 const Sequelize = require('sequelize');
 const moment = require('moment');


module.exports = class Join extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            email:{
                type:Sequelize.STRING(40),
                allowNull:false,               
            },
            pw:{
                type:Sequelize.STRING(40),
                allowNull:false,
            },
            name:{
                type:Sequelize.STRING(20),
                allowNull:false,
            },
            birth:{
                type:Sequelize.INTEGER(11),
                allowNull:false,
                get:function(){
                    return (this.getDataValue('birth')).format('YY-MM-DD')
                }
            },
            gender:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
            },
            contact:{
                type:Sequelize.STRING(11),
                allowNull:false,
                get:function(){
                    return (this.getDataValue('contact')).format('000-0000-0000')
                }
            },
            /*useridx:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                unique:true,
            },*/
            add_option:{
                type:Sequelize.BOOLEAN,
                allowNull:true,
            },            
            userdt:{
                type:Sequelize.DATEONLY,
                allowNull:false,
                defaultValue:Sequelize.NOW, 
                get: function(){
                    return moment(this.getDataValue('userdt')).format('YYYY-MM-DD')
                    //moment라는 패키지 다운받아야함 // npm install moment
                    //위에 moment가져와서 할당해줘야 사용가능
                    //this.getDataValue로 값을 가져오고 .format으로 형식 설정 
                }
            },
        

            
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            Modelname:'Join',
            tablename:'joins',
            charset:'utf8',
            collate:'utf8_general_ci'

        })
    }
}