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
    $('.table').remove(); 
    var $table = $("<div>"); 
    $table.addClass("table"); 
    for (var i = 0; i < obj[currentpage.toString()].length; i++) {
      var $item = $("<div>").text(obj[currentpage.toString()][i].toString());
      $table.append($item);
    };
    $('#content').append($table);
  },

  paginationrender: function(){
    // var $pages = $("<div>")
    for (var i = 1; i <= obj.pagesint; i++) {
      // var $page = $("<div>");
      // console.log(i.toString());
      var $page = new sap.m.Label({
        text: i.toString()
        // icon: "sap-icon://home"
      });
      // $page.addClass("btn btn-success pagebtn");
      // $page.text(i.toString());
      // if (i !== 1 && i !== obj.pagesint && i !== currentpage) {
      //   if (i !== currentpage - 1 && i !== ) {};
      //   $page.hide(); 
      // };
      // $pages.append($page);
      this.pagination.push($page);
    };
    // var $pageinput = $("<input>"); 
    // $pageinput.attr("id", "pageinput");
    // var $pageinputgo = $("<div>"); 
    // $pageinputgo.attr("id", "pageinputgo").addClass("btn btn-success").text("Go");
    // $('#content').append($pages, $pageinput, $pageinputgo);
    console.log("this pagination", this.pagination);
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
    display(); 
  }
})