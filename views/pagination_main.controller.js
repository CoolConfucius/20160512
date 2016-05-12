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
      var $page = new sap.m.Button({
        text: i.toString(),
        press: this.pageclick
      });
    
      this.paginationHeader.addContentLeft($page);
    };
  },

  pageclick: function() {
    var btnnum = $(this).text(); 
    if (btnnum === "1") {
      console.log("First page");
    };
    if (btnnum === obj.pagesint.toString()) {
      console.log("Last page");
    };
    currentpage = btnnum; 
    console.log(currentpage); 
  }
})