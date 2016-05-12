var obj = {};
var data = []; 
var currentpage = 1; 
for (var i = 0; i < 100; i++) {
  data.push(i.toString()); 
};
// ajax

obj = {
  pagesint: 1,
  all: data
}
var datacursor = 0; 
var page = 1; 
while (datacursor < data.length){
  obj[page.toString()] = [];
  // 100 instead of 10 for records
  for (var i = 0; i < 10; i++) {
    if (datacursor < data.length) {   
      obj[page.toString()].push(data[datacursor]);
      datacursor++; 
    };
  };
  page++; 
}
obj.pagesint = page - 1; 

sap.ui.controller("pagination.views.pagination_main", {
  
  //bus : sap.ui.getCore().getEventBus(),




  onInit: function() {
    console.log("on init main controller");
    this.app = sap.ui.getCore().byId("pagination-app");
    this.paginationrender();
    console.log(obj);

  },

  // _handleRouteMatched:function(evt){
  //   if ("pagination_main") {};
  // }

  onAfterRendering: function() {

  }, 

  display: function() {

  },

  paginationrender: function(){
    for (var i = 1; i <= obj.pagesint; i++) {
      // console.log(i.toString());
      var $page = new sap.m.Label({
        // text: i.toString() 
        text: "test1"     
      });
      
      // this.pagination.push($page);
      this.paginationHeader.addContentLeft($page);
    };

    console.log("this pagination", this.pagination);
  },

  pageclick: function() {

  }
})