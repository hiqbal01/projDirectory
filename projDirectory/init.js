module.exports = {
  init: function(db){
    db.query('SELECT 3 + 5 AS solution', function(data){
      console.log(data);
    });
    
    db.query('CREATE TABLE IF NOT EXISTS User (' +
                ' id int NOT NULL AUTO_INCREMENT,' +
                ' name VARCHAR(100),' +
                ' email VARCHAR(100),' +
                ' role VARCHAR(100),' +
                ' department VARCHAR(100),' +
                ' PRIMARY KEY(id))', function(data){
      console.log(data);
      db.query('SELECT COUNT(id) AS count FROM User WHERE id IS NOT NULL', function(data2){
        if(data2[0].count == 0){
          console.log("creating admin user");
          var user = {name: 'Haris', email: 'hiqbaldev@gmail.com', role: 'admin'};
          db.insert('INSERT INTO User SET ?', user, function(data3){
            console.log(data3);
          });
        }
      });
    });
    
  }
}