app.factory("seker", function($q, $http , user) {

    
    var skarim = [];
    var wasEverLoaded = false ;

    var openskarim ;
    var closeskarim ; 
    
   function Seker(sekerdata,newseker) {

        this.id = sekerdata.id;
        this.comp = sekerdata.comp;
        this.unit = sekerdata.unit;
        this.desc = sekerdata.desc;
        this.seker_date = sekerdata.seker_date;
        this.mivneid = sekerdata.mivneid;
        this.userid = sekerdata.userid;
        this.status = sekerdata.status;
        this.newseker = sekerdata.newseker;
    }

    
    
    function getskarim() {
        var async = $q.defer();

        skarim = [];
    
        if ( user.isSuperUser() || user.isSafety() ) { 

            var loginURL = "https://my-json-server.typicode.com/haifaboy/skarim/skarim?comp=" +
            user.getActiveUser().comp  ;

        } else {

            var loginURL = "https://my-json-server.typicode.com/haifaboy/skarim/skarim?comp=" +
            user.getActiveUser().comp  + '&&unit=' + user.getActiveUser().unit ;


        }

             $http.get(loginURL).then(function(response) {
                if (response.data.length > 0) {
                 
                    for (var i = 0; i < response.data.length; i++) {
                        var sekeri = new Seker(response.data[i],0);
                        skarim.push(sekeri);
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

    function getNumOfClosedSkarim(){

             return closeskarim ; 
    }

    function getNumOfOpenedSkarim(){

        return openskarim ; 
    }




    function getNextId () {

              var nextid = 0

              for ( var i = 0 ;  i < skarim.length ; i++ ) {

                    
                       if ( skarim[i].id > nextid ) { nextid = skarim[i].id }

              }

              return nextid + 1 ;


    }

    function addSeker(desc,unit,mivneid,userid,open_date,newseker) {

        this.id = getNextId();
        this.comp = user.getActiveUser().comp ;
        this.unit = unit;
        this.desc = desc;
        this.seker_date = open_date ; 
        this.mivneid = mivneid;
        this.userid = userid;
        this.seker_status = "open" ;
        this.newseker = newseker

        var newseker = new Seker(this);

        skarim.push(newseker) ; 

        calcskarim() ; 
       
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

        calcskarim() ; 


    }

    function deleteSeker(id) {

        var deleteindex  = -1 ;

        deleteindex = getIndexById(id)

        skarim.splice (deleteindex, 1);

        calcskarim() ; 
       
    }

    function calcskarim() {


        openskarim = 0 ;
        closeskarim = 0  ; 
        
        
        for ( var i = 0 ;  i < skarim.length ; i++ ) {

            skarim[i].status === 'open' ? openskarim ++ : closeskarim ++ ;
    
        }    


    }
  
    return {

        getskarim: getskarim ,
        getSkarim : getSkarim ,
        addSeker : addSeker,
        deleteSeker : deleteSeker ,
        closeSeker : closeSeker ,
        calcskarim , calcskarim ,
        getNumOfClosedSkarim : getNumOfClosedSkarim ,
        getNumOfOpenedSkarim : getNumOfOpenedSkarim  ,
        skarim : skarim 
    }  
})