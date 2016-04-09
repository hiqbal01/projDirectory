module.exports = {
    sequelize: null,
    connect: function(Sequelize, success){
        this.sequelize = new Sequelize('projdirectory', '*', '*',{
            host: 'projdirectory.crfeabkycicb.us-west-2.rds.amazonaws.com',
            dialect: 'mysql',
            pool: {
                max: 10,
                min: 0,
                idle: 10000
            }
        }); 
        this.createTables(Sequelize);
        this.init(Sequelize, success);
    },
    createTables: function(Sequelize){
        var self = this;
        self["User"] = self.sequelize.define('User', {
            username: Sequelize.STRING,
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            role: Sequelize.ENUM('ADMIN', 'USER'),
            department: Sequelize.STRING  
        });
    },
    init: function(Sequelize, success){
        var self = this;
        self.sequelize.sync().then(function() {
            return self["User"].create({
                username: 'janedoe',
                name: 'Jane Doe',
                email: 'jane@does.com',
                role: 'USER',
                department: 'CS'
            });
        }).then(function(){
            if(success){
                success();
            }
        });
    }
}