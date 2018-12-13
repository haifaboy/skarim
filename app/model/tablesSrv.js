app.factory("tables", function($q, $http, user) {

    var tables = [] ;
    var wasEverLoaded = ! ( tables.length ===  0 )  ;
    var comp = user.getcomp();

    function Table(tabledet,flag) {
        this.comp = tabledet.comp
        this.id = tabledet.id;
        this.name = tabledet.name;
        this.desc = tabledet.desc;
        this.json = flag ;
         
    }
    function TableA(comp , id , name, desc  ,flag) {
        this.comp = comp
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.json = flag ;
         
    }

    function getActiveTables() {
        var async = $q.defer();
             
        if (wasEverLoaded) {
            async.resolve(tables);
        } else {

            var getTablesURL = "https://my-json-server.typicode.com/haifaboy/skarim/tables/?comp=" + comp ;
            
            $http.get(getTablesURL).then(function(response) {

                    for (var i = 0; i < response.data.length; i++) {
                    var table = new Table(response.data[i],1);
                    tables.push(table);
                }
                wasEverLoaded = true;
                async.resolve(tables);
            }, function(error) {
                async.reject(error);
            });
        }

        return async.promise;
    }

    function getNextID() {

       var nextid ;

       
       if ( tables.length ===  0 )  {

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

       

    function createTable(  name, desc) {
        

        var id = getNextID() ; 

         var newTable = new TableA ( comp , id , name, desc , 0 );

        tables.push(newTable);
       
    }


    return {
        getActiveTables: getActiveTables ,
        createTable: createTable,
        getNumOfTables: getNumOfTables,
        getTables : getTables
    }
})