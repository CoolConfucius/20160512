sap.ui.controller("pagination.views.pagination_main", {
  
  //bus : sap.ui.getCore().getEventBus(),

  onInit: function() {
    console.log("on init main controller");
    this.app = sap.ui.getCore().byId("pagination-app");
    this.accCount();
    this.fillTable();
    // this.deviceLinkedAccounts(); 
  },

  // _handleRouteMatched:function(evt){
  //   if ("pagination_main") {};
  // }

  onAfterRendering: function() {

  }, 

  numberOfAccounts: 0,

  accCount: function() {
    var that=this;
    console.log("accCount");

    // $.ajax({
    //   url: '/sap/ocm/account_settings/ui/services/as.xsodata/account/',
    //   type: "GET",
    //   cache: false, 
    //   headers: {"X-Csrf-token" : sessionStorage.getItem("CSRF-Token")},
    //   dataType: "json",
    //   success: function(data) {
    //     that.numberOfAccounts = data.d.results.length; 
    //     that.acctitle.setText("Accounts ("+that.numberOfAccounts+")");
    //   },
    //   error: function(XMLHttpRequest, textStatus, errorThrown) {
    //     sap.m.MessageToast.show("Error: "+XMLHttpRequest.responseText);
    //   }
    // });
    // console.log(that);
    that.acctitle.setText("Accounts (0)");
  },

  accountsarray:[],
  accSettingsModel: new sap.ui.model.json.JSONModel(),
  carriers: [],

  fillTable: function() {
    var that = this;
    that.carriers = []; 
    console.log("fillTable")
    // $.ajax({
    //   url: '/sap/ocm/account_settings/ui/services/as.xsodata/account/',
    //   type: "GET",
    //   cache: false, 
    //   headers: {"X-Csrf-token" : sessionStorage.getItem("CSRF-Token")},
    //   dataType: "json",
    //   success: function(data) {
    //     that.accountsarray = data.d.results;
    //     that.accSettingsModel.setData(that.accountsarray); 
    //     for (var i=0;i<that.accountsarray.length;i++) {
    //       that.pushTouniqueArray(that.carriers, accountsarray[i].CARRIER_NAME);
    //     }
    //     that.Addcarrier.addItem(new sap.ui.core.Item({text: "Select a Carrier",key:"default"}));
    //     for (var j=0;j<that.carriers.length;j++) {
    //       that.Addcarrier.addItem(new sap.ui.core.Item({text: that.carriers[j],key:that.carriers[j]}));
    //     }
    //   },
    //   error: function(XMLHttpRequest, textStatus, errorThrown) {
    //     sap.m.MessageToast.show("Error: "+XMLHttpRequest.responseText);
    //   }
    // });
    sap.m.MessageToast.show("fillTable");
  },

  deviceLinkedAccountsArray: [],

  deviceLinkedAccounts: function() {
    var that=this;
    $.ajax({
      url: '/sap/ocm/account_settings/ui/services/as-analyticview.xsodata/AV/?$select=ACCOUNTID,DEVICE_ID',
      type: "GET",
      cache: false, 
      headers: {"X-Csrf-token" : sessionStorage.getItem("CSRF-Token")},
      dataType: "json",
      success: function(data,response) {
        for (i=0; i<data.d.results.length; i++) {
          that.deviceLinkedAccountsArray.push(data.d.results[i].ACCOUNTID); 
        }
      }
    });
  },

  onSort: function(value) {
    // var that = this; 
    // var oSorter = new sap.ui.model.Sorter(value, false);

    // var binding = that.accSettingsTable.getBinding("items");
    // binding.sort(oSorter);
    console.log(value);
  },

  accountHovered:"",
  carrierHovered:"",
  contactHovered:"",

  onCarrierHover: function() {
    var that=this;
    $.ajax({
      url: '/sap/ocm/account_settings/ui/services/as.xsodata/deviceaccess?$filter=ACCOUNTID eq '+"'"+that.accoundtHovered+"'"+' and CARRIERNAME eq '+"'"+that.carrierHovered+"'",
      type: "GET",
      cache: false,
      headers: {"X-Csrf-token" : sessionStorage.getItem("CSRF-Token")},
      dataType: "json",
      success: function(data) {
        console.log(data.d.results);
        that.openCarrierMenu(data);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        sap.m.MessageToast.show("Error: "+XMLHttpRequest.responseText);
      }
    });
  },

  onContactHover: function(e) {
    console.log("onContactHover");
    var that=this;
    $.ajax({
      url: '/sap/ocm/account_settings/ui/services/as.xsodata/deviceaccess?$filter=ACCOUNTID eq '+"'"+that.accoundtHovered+"'"+' and PRIMARYCONTACT eq '+"'"+that.contactHovered+"'",
      type: "GET",
      cache: false,
      headers: {"X-Csrf-token" : sessionStorage.getItem("CSRF-Token")},
      dataType: "json",
      success: function(data) {
        that.openContactMenu(data,e);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        sap.m.MessageToast.show("Error: "+XMLHttpRequest.responseText);
      }
    });
  },

  openCarrierMenu: function(data) {
    console.log("openCarrierMenu");
    var that = this;

    that.ocarrieritem1.setText("Valid "+data.d.results[0].CARRIERNAME);
    that.ocarrieritem2.setText("URL: "+data.d.results[0].URL);
    that.ocarrieritem3.setText("Username: "+data.d.results[0].USERNAME);
    that.ocarrieritem4.setText("Password: ********");
    that.ocarrieritem5.setText("Lisence Key: "+data.d.results[0].LICENSEKEY);

    var eDock = sap.ui.core.Popup.Dock;
    that.ocarrierMenu.open(this._bKeyboard, eDock.CenterTop, eDock.CenterBottom);
  },

  openContactMenu: function(data, e) {
    console.log("openContactMenu", e);
    var that = this;

    that.ocontactitem1.setText(data.d.results[0].PRIMARYCONTACT);
    that.ocontactitem2.setText("Email: "+data.d.results[0].EMAILCONTACT);
    that.ocontactitem3.setText("Phone: "+data.d.results[0].PHONE);
    that.ocontactitem4.setText("Address: "+data.d.results[0].ADDRESS);

    var eDock = sap.ui.core.Popup.Dock;
    that.ocarrierMenu.open(this._bKeyboard, eDock.CenterTop, eDock.CenterRight);
  },

  openFilterPanel: function(oEvt) {
    var that = this;
    that.getFilterPanelinfo();

    if(!that.Subpanel.getExpanded()) {
      that.Subpanel.setExpanded(true);
      that.filterBtn.setIcon('sap-icon://decline');
    }
    else {
      that.Subpanel.setExpanded(false);
      that.filterBtn.setIcon('sap-icon://add-filter');
    }
  },

  array:[],
  accIDArray:[],
  accNameArray:[],
  controlArray:[],

  getFilterPanelinfo: function() {
    var that = this;

    $.ajax({
      url: '/sap/ocm/account_settings/ui/services/as.xsodata/account/',
      type: "GET",
      cache: false,
      headers: {"X-Csrf-token" : sessionStorage.getItem("CSRF-Token")},
      dataType: "json",
      success: function(data) {
        that.array = data.d.results;
        that.accIDArray =[];
        that.accNameArray =[];
        that.controlArray =[];
        that.oaccIDSelect.removeAllItems();
        that.oaccNameSelect.removeAllItems();
        that.ocontrolSelect.removeAllItems();

        for (var s=0; s < that.array.length; s++) {
          if (that.array[s].ACCOUNTID !== null) {
            that.pushTouniqueArray(that.accIDArray,that.array[s].ACCOUNTID);
          }
          if (that.array[s].NAME !== null) {
            that.pushTouniqueArray(that.accNameArray,that.array[s].NAME);
          }
          if (that.array[s].CONTROL_CENTER !== null) {
            that.pushTouniqueArray(that.controlArray,that.array[s].CONTROL_CENTER);
          }
        }

        that.oaccIDSelect.addItem(new sap.ui.core.Item({text: "All"}));
        that.oaccNameSelect.addItem(new sap.ui.core.Item({text: "All"}));
        that.ocontrolSelect.addItem(new sap.ui.core.Item({text: "All"}));

        for (var k = 0; k < that.accIDArray.length; k++) {
          that.oaccIDSelect.addItem(new sap.ui.core.Item({text: that.accIDArray[k]}));
        }
        for (var j = 0; j < that.accNameArray.length; j++) {
          that.oaccNameSelect.addItem(new sap.ui.core.Item({text: that.accNameArray[j]}));
        }
        for (var i = 0; i < that.control.length; i++) {
          that.ocontrolSelect.addItem(new sap.ui.core.Item({text: that.control[i]}));
        }

      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        sap.m.MessageToast.show("Error: "+XMLHttpRequest.responseText);
      }
    });
  },






  pushTouniqueArray: function(array, item) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].indexOf(item) !== -1) {
        return; 
      }
      array.push(item); 
    };
  },

  accIDvalue: "All",
  accNamevalue: "All",
  controlvalue: "All",

  onaccIDSelectChange: function(value) {
    var that = this;
    that.accIDvalue = value; 
  },

  onaccNameSelectChange: function(value) {
    var that = this;
    that.accNamevalue = value; 
  },
  
  oncontrolSelectChange: function(value) {
    var that = this;
    that.controlvalue = value; 
  },




  openFilterPanel: function(oEvt){
    alert("openFilterPanel"); 
  }
})