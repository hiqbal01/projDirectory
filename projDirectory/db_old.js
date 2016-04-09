module.exports = {
  pool: null,
  
  connect: function(mysql, success){
    this.pool = mysql.createPool({
      host     : 'projdirectory.crfeabkycicb.us-west-2.rds.amazonaws.com',
      user     : 'admin',
      password : 'tester123',
      database : 'projdirectory',
      port: '3306'
    });

    this.pool.getConnection(function(err, connection){
      if(err) throw err;
      connection.query('SELECT 1 + 1 AS solution', function(error, rows, fields) {
        if (error) throw error;
        if(rows[0].solution === 2){
          console.log("Connected to DB");
          if(success) success();
        }
        connection.release();
      });
    });
    
    return this.pool;
  },
  
  query: function(queryString, success){
    this.pool.getConnection(function(err, connection){
      if(err) throw err;
      connection.query(queryString, function(error, rows, fields) {
        if (error) throw error;
        if(success){
          success(rows, fields);
        }
        connection.release();
      });
    });
  },
  
  insert: function(queryString, obj, success){
    this.pool.getConnection(function(err, connection){
      if(err) throw err;
      var q = connection.query(queryString, obj, function(error, result) {
        console.log(result);
        if (error){
          return connection.rollback(function() {
            throw error;
          });
        }
        if(success){
          success(result);
        }
        connection.release();
      });
    });
  },
  
  end: function(){
    if(this.pool != null){
      pool.end(function(err){
        if(err) throw err;
      });
    }
  }
  
}