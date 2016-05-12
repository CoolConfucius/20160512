//(function() {
  //'use strict';

  sap.ui.jsview("pagination.pagination", {

    getControllerName: function() {
      return "pagination.pagination"; 
    }, 

    createContent: function(oController) {
      this.setDisplayBlock(true); 

      return new sap.m.App("pagination-app", {}); 
    }
  })
//})