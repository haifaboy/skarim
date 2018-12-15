app.factory("mivne", function($q, $http, user) {

    var mivnim = [];
    var wasEverLoaded = false;
    var comp =  user.getcomp()

    function Mivne(Mivnedet) {
 
        this.comp = Mivnedet.comp; 
        this.id = Mivnedet.id;
        this.desc = Mivnedet.desc;
        this.unit = Mivnedet.unit;
        this.type = Mivnedet.type;
       
    }

    function getActiveMivnim() {
        var async = $q.defer();

        if (wasEverLoaded) {
            async.resolve(mivnim);
        } else {

                            
            var getMivnimURL = "https://my-json-server.typicode.com/haifaboy/skarim/mivnim/?comp=" + comp ;
            
            $http.get(getMivnimURL).then(function(response) {
 
               for (var i = 0; i < response.data.length; i++) {
                    var mivne = new Mivne(response.data[i]);
                    mivnim.push(mivne);
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

       if ( mivnim.length =  0 )  {

        nextid  = 1 ; 

       } else {

                nextid = mivnim[0].id ;
                
                for ( var i = 0 ; i < mivnim.length ; i++) {

                    nextid < mivnim[i].id ?  nextid = mivnim[i].id : nextid = nextid ; 
              
                }

                ++nextid ;


       }
       
       return nextid ;
    }

    function getNumOfMivnim() {

         return mivnim.length ; 


    }

      

    function createMivne( desc, unit, type) {
        var async = $q.defer();

        var id = getNextID() ; 
         

        var newMivne = new Mivne ( comp  ,  id ,  desc, unit, type );

        mivnim.push(newMivne);
        async.resolve(newMivne);

        return async.promise;
    }

    function getMivneById(id){

        var mivne = null ;  
        
        for ( var i = 0 ; i < mivnim.length ; i++) {
      
            if ( id  === mivnim[i].id  ) {
                
                mivne = mivnim[i]
                i = mivnim.length + 1 ;

            }
            
      
        }

        return mivne ;


    }

    getActiveMivnim().then(function(mivnim) {
    }, function(error) {
   $log.error(error);
   });


    return {
             getActiveMivnim: getActiveMivnim ,
             createMivne: createMivne,
             getNumOfMivnim: getNumOfMivnim,
             getMivneById , getMivneById ,
             mivnim : mivnim
    }
})