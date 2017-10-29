sap.ui.controller("com.learning.controller.Details", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Details
*/
	onInit: function() {
		var oComponent = this.getOwnerComponent();
		this._router = oComponent.getRouter();
		this._router.getRoute("details").attachPatternMatched(this._routePatternMatched, this);
	},

	_routePatternMatched: function (oEvent) {
		var iEmpID = oEvent.getParameter('arguments').id,
			oView = this.getView(),
			sPath = "/Employees(" + iEmpID + ")";
		
		var oModel = oView.getModel('oDataModel');
		var oData = oModel.getData(sPath);
		oView.bindElement({
			path: sPath,
			events: {
				dataRequested: function () {
					oView.setBusy(true);
				},
				dataReceived: function () {
					oView.setBusy(false);
				}
			},
			model:"oDataModel"
		});
		//if there is no data the model has to request new data
		if (!oData) {
			oView.setBusyIndicatorDelay(0);
			oView.getElementBinding('oDataModel').attachEventOnce("dataReceived", function() {
				// reset to default
				oView.setBusyIndicatorDelay(null);
				this._checkIfEmpAvailable(sPath, iEmpID);
			}.bind(this));
		}
		
	},
	_checkIfEmpAvailable: function(sPath, sId) {
		var oModel = this.getView().getModel('oDataModel');
		var oData = oModel.getData(sPath);

		// show not found page
		if (!oData) {
			this._router.getTargets().display("notFound", sId);
		}
	},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Details
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Details
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Details
*/
//	onExit: function() {
//
//	}
	onNav: function () {
		this._router.navTo('welcome');
	},
	onNavToCategories: function () {
		this._router.navTo('categories');
	},
	
	handleTelPress: function (oEvent) {
		sap.m.URLHelper.triggerTel(oEvent.getSource().getText());
	},
	
	

});