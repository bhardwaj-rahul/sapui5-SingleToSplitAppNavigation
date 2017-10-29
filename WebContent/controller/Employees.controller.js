sap.ui.controller("com.learning.controller.Employees", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Employees
*/
	onInit: function() {
		var oComponent = this.getOwnerComponent();
		this._router = oComponent.getRouter();
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Employees
*/
//	onBeforeRendering: function() {
//
//	},

	
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Employees
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Employees
*/
//	onExit: function() {
//
//	}
	
	onEmpSearch: function (oEvent) {
		
		var sQuery = oEvent.getParameter('query');
		var aFilters= [];
		if (sQuery) {
			var oFilterFName = new sap.ui.model.Filter({
				path:"FirstName",
				operator:'Contains',
				value1: sQuery
			});
			aFilters.push(oFilterFName);
			var oFilterLName = new sap.ui.model.Filter({
				path:"LastName",
				operator:'Contains',
				value1: sQuery
			});
			aFilters.push(oFilterLName);
		}
		
		var oFilters = new sap.ui.model.Filter({
			filters:aFilters,
			and:false
		});
		
		var oList = this.getView().byId('idEmpList');
		if (aFilters.length > 0) {
			oList.getBinding('items').filter(oFilters);	
		} else {
			oList.getBinding('items').filter(aFilters);
		}
		
		
	},
	onEmpPress: function (oEvent) {
		
		var oBindingContext = oEvent.getSource().getBindingContext('oDataModel');
		var iEmpId = oBindingContext.getProperty('EmployeeID'); 
		this._router.navTo('details', {id: iEmpId});
	}

});