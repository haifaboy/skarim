app.factory("mivne", function($q, $http, user) {

    var mivnim = {};
    var wasEverLoaded = {};

    function Mivne(plainRecipe) {
        this.id = plainRecipe.id;
        this.name = plainRecipe.name;
        this.desc = plainRecipe.desc;
        this.unit = plainRecipe.unit;
        this.type = plainRecipe.type;
       
    }

    function getActiveMivnim() {
        var async = $q.defer();

        alert(1) ; 
          
        if (wasEverLoaded) {
            async.resolve(mivnim);
        } else {

            var comp = user.getActiveUser().comp ;
            
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

    function getMivnim() {

          return mivnim ; 


    }

    

    function createMivne( name, desc, unit, type) {
        var async = $q.defer();

        id = getNextID() ; 

        var newMivne = new Mivne (id , name, desc, unit, type );

        mivnim.push(newMivne);
        async.resolve(newMivne);

        return async.promise;
    }


    return {
             getActiveMivnim: getActiveMivnim ,
             createMivne: createMivne,
             getNumOfMivnim: getNumOfMivnim,
             getMivnim : getMivnim
    }
})