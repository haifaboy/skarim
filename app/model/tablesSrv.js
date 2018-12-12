app.factory("tables", function($q, $http, user) {

    var tables = {};
    var wasEverLoaded = {};

    function Table(tabledet) {
        this.com = tabledet.comp
        this.id = tabledet.id;
        this.name = plainRecipe.name;
       
       
    }

    function getActiveTables() {
        var async = $q.defer();

      
          
        if (wasEverLoaded) {
            async.resolve(tables);
        } else {

            var comp = user.getActiveUser().comp ;
            
            var getTablesURL = "https://my-json-server.typicode.com/haifaboy/skarim/tables/?comp=" + comp ;
            
            $http.get(getTablesURL).then(function(response) {

               alert(response.data.length);
                 
               for (var i = 0; i < response.data.length; i++) {
                    var table = new Table(response.data[i]);
                    tables.push(table);
                }
                wasEverLoaded = true;
                async.resolve(mivnim);
            }, function(error) {
                async.reject(error);
            });
        }

        return async.promise;
    }

    function getNextID() {

       var nextid ;

       if ( table.length =  0 )  {

        nextid  = 1 ; 

       } else {

                nextid = tables[0].id ;
                
                for ( var i = 0 ; i < tables.length ; i++) {

                    nextid < tables[i].id ?  nextid = tables[i].id : nextid = nextid ; 
              
                }

                ++nextid ;


       }
       
       return nextid ;
    }

    function getNumOfTables() {

         return tables.length ; 


    }

    function getTables() {

          return tables ; 


    }

    

    function createTable( comp, id , name, desc) {
        var async = $q.defer();

        id = getNextID() ; 

        var newTable = new Table (comp, id , name, desc );

        tables.push(newTable);
        async.resolve(newTable);

        return async.promise;
    }


    return {
        getActiveTables: getActiveTables ,
        createTable: createTable,
        getNumOfTables: getNumOfTables,
        getTables : getTables
    }
})