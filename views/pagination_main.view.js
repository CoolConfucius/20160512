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


    var appHeader = new sap.m.Bar(this.createId("pagination-headerBar"), {      
      contentLeft: [homeBtn],
      contentMiddle: [headerLabel],
      contentRight: [filterBtn]
    }).addStyleClass("as-app-header");


    // SUB HEADER BAR 

    var acctitle = new sap.m.Label({
      For:"accid"
    }).addStyleClass('acctitle'); 
    oController.acctitle = acctitle; 

    var ocreatebtn = new sap.m.Button({
      icon: "sap-icon://add",
      tooltip: "Create", 
      press: function() {
        oController.AddDialog.setTitle("New Account"); 
        oController.Addaccid.setEnabled(true); 
        oController.Addcarrier.setEnabled(true); 
        oController.AddDialog.open();
        oController.clearFields(); 
      }
    }).addStyleClass("ocreatebtn");
    oController.ocreatebtn=ocreatebtn; 

    var deletebtn = new sap.m.Button({
      icon: "sap-icon://delete",
      tooltip: "Delete", 
      press: function(e) {
        if (oController.accSettingsTable.getSelectedItems().length > 0) {
          oController.DeleteDialog.open(); 
        }
        else {
          sap.m.MessageBox.alert("Please select accounts first."); 
        }
      }
    })
    oController.deletebtn=deletebtn; 

    var osort = new sap.m.Select({
      enabled: true, 
      width:"200px", 
      change: function(e) {
        var value1 = this.getSelectedItem().getText();
        if (value1 == "Account Name") {
          var value = "NAME"; 
        }
        if (value1 == "Account ID") {
          var value = "ACCOUNTID"; 
        }
        else if (value1 == "Control Center") {
          var value = "CONTROL_CENTER"; 
        }
        oController.onSort(value); 
      }
    }).addStyleClass('osort');
    oController.osort=osort; 

    osort.addItem(new sap.ui.core.Item({text: "Account Name"}));
    osort.addItem(new sap.ui.core.Item({text: "Account ID"}));
    osort.addItem(new sap.ui.core.Item({text: "Control Center"}));

    var labelosort = new sap.m.Label({
      text:"Sort By"
    }).addStyleClass('labelosort'); 
    oController.labelosort = labelosort;

    var ogroupbtn = new sap.m.Button({
      icon: "sap-icon://group-2",
      tooltip: "Group",
      enabled:false,
    }).addStyleClass('ogroupbtn');
    oController.ogroupbtn=ogroupbtn;

    var sortBtn = new sap.m.Button({
      icon: "sap-icon://sort",
      tooltip: "Sort",
      press: function() {
        oController.SortbuttonClicked();
      }
    })    
    oController.sortBtn = sortBtn; 

    var SubHeader = new sap.m.Bar(this.createId("ASsubheaderBar"), {
      contentLeft: [acctitle,ocreatebtn,deletebtn],
      contentRight: [sortBtn,labelosort,osort,ogroupbtn]
    }).addStyleClass('as_SubheaderBar');
    oController.SubHeader = SubHeader;

    // TOKEN

    var oInfoToolbar = new sap.ui.layout.HorizontalLayout( {
      visible: false,
      allowWrapping: true, 
      content: [ new sap.m.Label( {
        text: "Sorted By: "
      } ) ]
    } );
    oController.oInfoToolbar = oInfoToolbar;
    oInfoToolbar.addStyleClass( "filterTokenizer" );

    var oToken = new sap.m.Token({
      'delete': [ oController.deleteSort, oController ]
    });
    oController.oToken = oToken;

    // TABLE

    var accSettingsTable = new sap.m.Table({
      mode: sap.m.ListMode.MultiSelect,
      width:"92%",
      columns: [
      new sap.m.Column({
        hAlign : "Left",
        header: new sap.m.Label({
          text : "Account ID"
        })
      }),
      new sap.m.Column({
        hAlign : "Left",
        header: new sap.m.Label({
          text: "Account Name"
        })
      }),
      new sap.m.Column({
        hAlign : "Left",
        header: new sap.m.Label({
          text: "Control Center"
        })
      }),
      new sap.m.Column({
        hAlign : "Left",
        header: new sap.m.Label({
          text: "Contact"
        })
      }),
      new sap.m.Column({
        hAlign : "Left",
        header: new sap.m.Label({
          text: "Email"
        })
      }),
      new sap.m.Column({
        hAlign : "Left",
        width:"50px",
        header: new sap.m.Label({
          text: "Edit"
        })
      })
      ]
    }).addStyleClass('accSettingsTable');
    oController.accSettingsTable = accSettingsTable; 

    var carrierpanel = new sap.m.Panel().addStyleClass('panels carrierpanel');
    oController.carrierpanel = carrierpanel;
    carrierpanel.addContent(new sap.m.Text({text: "{CARRIER_NAME}",textAlign : sap.ui.core.TextAlign.Begin}));
    carrierpanel.addContent(new sap.ui.core.Icon({src:"sap-icon://inspection"}));

    var contactpanel = new sap.m.Panel().addStyleClass('panels contactpanel');
    oController.contactpanel = contactpanel;
    contactpanel.addContent(new sap.m.Text({text: "{PRIMARYCONTACT}",textAlign : sap.ui.core.TextAlign.Begin}));
    contactpanel.addContent(new sap.ui.core.Icon({src:"sap-icon://employee-lookup"}));

    var accSettingstemplate = new sap.m.ColumnListItem({
      type : "Active",
      unread : false, 
      vAlign : "Middle",
      cells : [
      new sap.m.Text({
        text : "{ACCOUNTID}",
        textAlign : sap.ui.core.TextAlign.Begin
      })
      ]
    }).addStyleClass('accSettingstemplate');
    oController.accSettingstemplate = accSettingstemplate;

    // accSettingsTable.setModel(oController.accSettingsModel); 
    accSettingsTable.bindAggregation("items", "/", accSettingstemplate); 

    accSettingsTable.addEventDelegate({
      onAfterRendering: function(){
        var col;
        var row; 
        var iconrow; 
        var startTimer; 

        $("td").hover(
          function(){
            col = $(this).parent().children().index($(this));
            row = $(this).parent().parent().children().index($(this).parent());
            iconrow = row+1;

            $(".accSettingsTable"+" tr:nth-child("+iconrow+") td:nth-child(5) .sapUiIcon").css("color","black");
            $(".accSettingsTable"+" tr:nth-child("+iconrow+") td:nth-child(6) .sapUiIcon").css("color","black");
          },
          function(){
            $(".accSettingsTable"+" tr:nth-child("+iconrow+") td:nth-child(5) .sapUiIcon").css("color","white");
            $(".accSettingsTable"+" tr:nth-child("+iconrow+") td:nth-child(6) .sapUiIcon").css("color","white");
          }
        );

        $("td:nth-child(5) .sapMText").hover(
          function() {
            startTimer = setTimeout(function(){
              oController.accountHovered = oController.accountsarray[row].ACCOUNTID;
              oController.carrierHovered = oController.accountsarray[row].CARRIER_NAME;
              oController.onCarrierHover();
            }, 300);
          },
          function() {
            clearTimeout(startTimer);
            oController.ocarrierMenu.close();
          }
        );

        $("td:nth-child(6) .sapMText").hover(
          function() {
            startTimer = setTimeout(function(){
              oController.accountHovered = oController.accountsarray[row].ACCOUNTID;
              oController.contactHovered = oController.accountsarray[row].PRIMARYCONTACT;
              oController.onContactHover();
            }, 300);
          },
          function() {
            clearTimeout(startTimer);
            oController.ocontactMenu.close();
          }
        );
      }
    }, accSettingsTable);

    // MENU

    var ocarrieritem1 = new sap.ui.unified.MenuItem();
    oController.ocarrieritem1 = ocarrieritem1;
    var ocarrieritem2 = new sap.ui.unified.MenuItem();
    oController.ocarrieritem2 = ocarrieritem2;
    var ocarrieritem3 = new sap.ui.unified.MenuItem();
    oController.ocarrieritem3 = ocarrieritem3;
    var ocarrieritem4 = new sap.ui.unified.MenuItem();
    oController.ocarrieritem4 = ocarrieritem4;
    var ocarrieritem5 = new sap.ui.unified.MenuItem();
    oController.ocarrieritem5 = ocarrieritem5;

    var ocarrierMenu = new sap.ui.unified.Menu({
      items: [ocarrieritem1,ocarrieritem2,ocarrieritem3,ocarrieritem4,ocarrieritem5]
    });


    var ocontactitem1 = new sap.ui.unified.MenuItem();
    oController.ocontactitem1 = ocontactitem1;
    var ocontactitem2 = new sap.ui.unified.MenuItem();
    oController.ocontactitem2 = ocontactitem2;
    var ocontactitem3 = new sap.ui.unified.MenuItem();
    oController.ocontactitem3 = ocontactitem3;
    var ocontactitem4 = new sap.ui.unified.MenuItem();
    oController.ocontactitem4 = ocontactitem4;
    var ocontactitem5 = new sap.ui.unified.MenuItem();
    oController.ocontactitem5 = ocontactitem5;

    var ocontactMenu = new sap.ui.unified.Menu({
      items: [ocontactitem1,ocontactitem2,ocontactitem3,ocontactitem4,ocontactitem5]
    });

    // FILTER PANEL

    var oaccIDSelect = new sap.m.Select({
      enabled: true, 
      width: "100%",
      items: [],
      layoutData: new sap.ui.layout.GridData({
        span: "L12 M12 S12"
      }),
      change: function(e) {
        var value = this.getSelectedItem().getText(); 
        oController.onaccIDSelectChange(value); 
      }
    });
    oController.oaccIDSelect=oaccIDSelect; 

    var oaccNameSelect = new sap.m.Select({
      enabled: true, 
      width: "100%",
      items: [],
      layoutData: new sap.ui.layout.GridData({
        span: "L12 M12 S12"
      }),
      change: function(e) {
        var value = this.getSelectedItem().getText(); 
        oController.onaccNameSelectChange(value); 
      }
    });
    oController.oaccNameSelect=oaccNameSelect;

    var ocontrolSelect = new sap.m.Select({
      enabled: true, 
      width: "100%",
      items: [],
      layoutData: new sap.ui.layout.GridData({
        span: "L12 M12 S12"
      }),
      change: function(e) {
        var value = this.getSelectedItem().getText(); 
        oController.oncSelectChange(value); 
      }
    });
    oController.ocontrolSelect=ocontrolSelect; 

    var goButton = new sap.m.Button({
      text:"Go",
      type:"Emphasized",
      width:"35%",
      layoutData: new sap.ui.layout.GridData({
        span: "L12 M12 S12"
      }),
      press: function(e) {
        oController.goButtonPressed();
      }
    }).addStyleClass('gobutton');

    var HorizontalLayout = new sap.ui.layout.HorizontalLayout({
      content: [
      new sap.m.Panel({
        content: [
        new sap.ui.layout.Grid({
          content: [
          new sap.m.Label({
            text: "Account ID",
            layoutData: new sap.ui.layout.GridData({
              linebreak: true, 
              span: "L12 M12 S12"
            })
          }),
          oaccIDSelect
          ]
        })
        ]
      }),
      new sap.m.Panel({
        content: [
        new sap.ui.layout.Grid({
          content: [
          new sap.m.Label({
            text: "Account Name",
            layoutData: new sap.ui.layout.GridData({
              linebreak: true, 
              span: "L12 M12 S12"
            })
          }),
          oaccNameSelect
          ]
        })
        ]
      }),
      new sap.m.Panel({
        content: [
        new sap.ui.layout.Grid({
          content: [
          new sap.m.Label({
            text: "Control Center",
            layoutData: new sap.ui.layout.GridData({
              linebreak: true, 
              span: "L12 M12 S12"
            })
          }),
          ocontrolSelect
          ]
        })
        ]
      }),
      new sap.m.Panel({
        content: [
          new sap.ui.layout.Grid({
            content: [
              goButton
            ]
          })
        ]
      })

      ]
    })

    var Subpanel = new sap.m.Panel({
      content: [HorizontalLayout]
    })

    var oPage = new sap.m.Page({
      customHeader: appHeader, 
      content: [Subpanel,SubHeader,accSettingsTable]
    })

    return oPage; 
  }

})