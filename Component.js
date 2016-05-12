jQuery.sap.declare("pagination.Component");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

jQuery.sap.registerModulePath("pagination", "./");
jQuery.sap.registerModulePath("pagination.views", "./views");

sap.ui.core.UIComponent.extend("pagination.Component", {
  metadata : {
    "name" : "pagination",
    "version" : "1.0", 
    "includes" : [],
    "dependencies" : {
      "libs" : ["sap.m"],
      "components" : []
    }, 

    // config : {
    //   resourceBundle: "pagination"
    // }

    routing: {
      config: {
        viewType : "JS",
        viewPath: "pagination.views",
        targetAggregation: "pages",
        targetControl: "pagination-app",
        clearTarget: false 
      }, 
      routes: [
        {
          pattern:"",
          name : "pagination_main",
          view : "pagination_main",
          viewType: "JS"
        }
      ]
    }
  },

    // init : function() {
    //   console.log("UNDER INIT ");
    //   //sap.ui.core.UIComponent.prototype.init.apply(this, arguments); 

    //   //this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this.getRouter());
    //   //this.getRouter().initialize(); 

    // }, 

  createContent : function() {

    //var mConfig = this.getMetadata().getConfig(); 

    // var paginationModel = new sap.ui.model.json.JSONModel({
    //   isTouch : sap.ui.Device.support.touch, 
    //   isNoTouch : !sap.ui.Device.support.touch, 
    //   isPhone : jQuery.device.is.phone, 
    //   isNoPhone : !jQuery.device.is.phone, 
    //   listMode : (jQuery.device.is.phone) ? "None" : "singleSelectMaster", 
    //     listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
    // });
    // paginationModel.setDefaultBindingMode("OneWay"); 

    this.oMainView = sap.ui.view({
      type: sap.ui.core.mvc.ViewType.JS,
      id: "pagination-view",
      viewName: "pagination.pagination"
    });

    //this.oMainView.setModel(paginationModel, "device");
    this.getRouter().initialize();

    return this.oMainView;
  }

  //}
})
