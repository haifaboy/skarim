app.factory("mivne", function($q, $http, user) {

    var mivnim = [];
    var wasEverLoaded = false;
    var comp =  user.getcomp()

    function Mivne(Mivnedet,flag) {
 
        this.comp = Mivnedet.comp; 
        this.id = Mivnedet.id;
        this.desc = Mivnedet.desc;
        this.unit = Mivnedet.unit;
        this.type = Mivnedet.type;
        this.json = flag ;
       
    }

    function getActiveMivnim() {
        var async = $q.defer();

        if (wasEverLoaded) {
            async.resolve(mivnim);
        } else {

                            
            var getMivnimURL = "https://my-json-server.typicode.com/haifaboy/skarim/mivnim/?comp=" + comp ;
            
            $http.get(getMivnimURL).then(function(response) {
 
               for (var i = 0; i < response.data.length; i++) {
                    var mivne = new Mivne(response.data[i],0);
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
       
        var id = getNextID() ; 
         
        var newMivne = new Mivne ( comp  ,  id ,  desc, unit, type , 1);

        mivnim.push(newMivne);

        return id ;
       
   
    }


    function updateMivne(id , desc, unit, type)  {

        for ( var i = 0 ; i < mivnim.length ; i++) {
      
            if ( id  === mivnim[i].id  ) {
                
               
                mivnim[i].desc = desc ,
                mivnim[i].unit = unit ,
                mivnim[i].type = type
                i = mivnim.length + 1 ; 

            }
            
      
        }




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

    function getMivneTypeDesc(mivnetype) {

        var desc ;

        switch(mivnetype) {
            case 'R':
                desc = 'רגיל'
              break;
            case 'D':
                desc = 'חם'
              break;
            default:
            
          }  

          return desc ; 
        

        return desc ; 
          


    }

//     getActiveMivnim().then(function(mivnim) {
//     }, function(error) {
//    $log.error(error);
//    });

   


    return {
             getActiveMivnim: getActiveMivnim ,
             createMivne: createMivne,
             getNumOfMivnim: getNumOfMivnim,
             getMivneById , getMivneById ,
             getMivneTypeDesc , getMivneTypeDesc , 
             updateMivne : updateMivne , 
             mivnim : mivnim 
    }
})