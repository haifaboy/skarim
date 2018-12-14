app.factory("seker", function($q, $http , user) {

   
    
    var skarim = [];
  
    var wasEverLoaded = false ;
    
   function Seker(plainUser) {

        this.id = plainUser.id;
        this.comp = plainUser.comp;
        this.desc = plainUser.desc;
        this.mivneid = plainUser.mivneid;
        this.userid = plainUser.userid;
        this.seker_statusdate = plainUser.status;
    }


    function skarim() {
        var async = $q.defer();
        
       
        var loginURL = "https://my-json-server.typicode.com/haifaboy/skarim/skarim?comp=" +
        user.getActiveUser().comp  
       
            $http.get(loginURL).then(function(response) {
                if (response.data.length > 0) {
                 
                    for (var i = 0; i < response.data.length; i++) {
                        var seker = new Seker(response.data[i]);
                        skarim.push(seker);
                    }
               
                    async.resolve(skarim);
               
              
                } else {
                  
                   
                    
                }
            }, function(error) {
                async.reject(error);
            });

      

        return async.promise;
    }

    function getSkarim () {

        return skarim ;

    }


    function getNextId () {

              var nextid = 0

              for ( var i = 0 ;  i < skarim.length ; i++ ) {

                    
                       if ( skarim[i].id > nextid ) { nextid = skarim[i].id }

              }

              return nextid + 1 ;


    }

    function addSeker(desc,mivneid,userid) {

        this.id = getNextId();
        this.comp = user.getActiveUser().comp ;
        this.desc = desc;
        this.mivneid = mivneid;
        this.userid = userid;
        this.seker_statusdate = "open" ;

        var newseker = new Seker(this);

        skarim.push(newseker) ; 
       
    }

    function getIndexById(id) {

         var index = 0  ;

         for ( var i = 0 ;  i < skarim.length ; i++ ) {

                    
            if ( skarim[i].id = id ) { 
                index = i
                i =  skarim.length + 1 ; 
            }

        }    

        return index ;

    }

    function closeSeker (id) {

        var updateindex  = -1 ;

        updateindex = getIndexById(id)

        skarim[updateindex].status = 'close'


    }

    function deleteSeker(id) {

        var deleteindex  = -1 ;

        deleteindex = getIndexById(id)

        skarim.splice (deleteindex, 1);
       
    }

   
    return {

        skarim: skarim ,
        getSkarim : getSkarim ,
        addSeker : addSeker,
        deleteSeker : deleteSeker ,
        closeSeker : closeSeker
    }
})