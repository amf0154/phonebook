angular.module('myApp', []) 
.filter('startFrom', function(){
  return function(input, start){
    start = +start;
    return input.slice(start);
  };
})
.controller('myController', function($scope,$http){   
    // for reading information from json database
   $http.get("phones.json").then(function(resp) {
       $scope.peoples=resp.data; 
   });
   $scope.editorEnabled = false; 
   $scope.table = true;
   // for adding new contact
   $scope.pusher = function(namee,phonee,companyy,labell,addForm){
       if(addForm.$valid){
       $scope.peoples.push({name:namee,phone:phonee,company:companyy,label:labell});
       $scope.save();
       $scope.addContact = true;
       $scope.addFormm = false;
       $scope.searcher = true;
       }
   };
   // delete contact
   $scope.del = function(id){
    $scope.peoples.splice(id,1);
    $scope.save();
   };
   
  // update contact 
  $scope.upd = function(id,currentName,currentPhone,currentCompany,currentLabel){
  $scope.peoples[id] = {name:currentName,phone:currentPhone,company:currentCompany,label:currentLabel};
  $scope.disableEditor();
  $scope.save();
   };
   
   $scope.searcher = true;
   $scope.addFormm = false;
   $scope.addContact = true;
   // button for adding contacts
   $scope.addNew = function(){
   $scope.searcher = false;    
   $scope.addContact =false;
   $scope.addFormm = true;  
   };
   
   // edit button
    $scope.enableEditor = function(index) {
        $scope.table = false;
        $scope.editorEnabled = true;
        $scope.currentName = $scope.peoples[index].name;
        $scope.currentPhone = $scope.peoples[index].phone;
        $scope.currentCompany = $scope.peoples[index].company;
        $scope.currentLabel = $scope.peoples[index].label;
        $scope.idupd = index;
    };
   
    $scope.disableEditor = function() {
        $scope.editorEnabled = false;
        $scope.table = true;
    };
    // for saving information to json database
    $scope.save = function (){
        $http.post("phones.php", $scope.peoples).then(function(response) {
        $scope.peoples=response.data;
        });
    }; 
    
    
       // pagination begin 
  $scope.currentPage = 0;
  $scope.itemsPerPage = 10;

  $scope.firstPage = function() {
    return $scope.currentPage === 0;
  };
  $scope.lastPage = function() {
    var lastPageNum = Math.ceil($scope.peoples.length / $scope.itemsPerPage - 1);
    return $scope.currentPage === lastPageNum;
  };
  $scope.numberOfPages = function(){
    return Math.ceil($scope.peoples.length / $scope.itemsPerPage);
  };
  $scope.startingItem = function() {
    return $scope.currentPage * $scope.itemsPerPage;
  };
  $scope.pageBack = function() {
    $scope.currentPage = $scope.currentPage - 1;
  };
  $scope.pageForward = function() {
    $scope.currentPage = $scope.currentPage + 1;
  };
   // pagination end
});

