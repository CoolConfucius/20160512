jQuery.sap.require("sap.m.MessageBox"); 

sap.ui.jsview("pagination.views.pagination_main", {
  getControllerName: function() {
    return "pagination.views.pagination_main";
  }, 

  createContent: function(oController) {

    this.setHeight("100%"); 

    // HEADER BAR 

    var homeBtn = new sap.m.Button(this.createId("pagination-homebutton"), {
      icon: "sap-icon://home",
      tooltip: "Home",
      press: function() {
        alert("Home sweet home");
      }
    });
    oController.homeBtn = homeBtn; 

    var headerLabel = new sap.m.Label(this.createId("pagination-label"), {
      text: "pagination"
    }); 

    var filterBtn = new sap.m.Button(this.createId("pagination-filterBtnnbutton"),{
      icon: "sap-icon://add-filter",
      tooltip: "Filter",
      press: function(e) {
        oController.openFilterPanel();
      }
    });
    oController.filterBtn = filterBtn; 


    var appHeader = new sap.m.Bar(this.createId("app-headerBar"), {      
      contentLeft: [homeBtn],
      contentMiddle: [headerLabel],
      contentRight: [filterBtn]
    }).addStyleClass("as-app-header");

    var paginationHeader = new sap.m.Bar(this.createId("pagination-headerBar"), {});
    oController.paginationHeader = paginationHeader; 


    // CONTENT TABLE 
    var contentTable = new sap.m.Table({
      // mode: sap.m.ListMode.MultiSelect,
      // growing: false,
      // columns : [
      //   new sap.m.Column({
      //     hAlign : "Center",
      //     header : new sap.m.Label({
      //       text: "Content: "
      //     })
      //   })
      // ]
    });
    

    var oPage = new sap.m.Page({
      customHeader: appHeader, 
      content: [paginationHeader, contentTable]
    })

    return oPage; 
  }

})