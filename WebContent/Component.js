//jQuery.sap.declare('com.learning.Component');

sap.ui.define([
               'sap/ui/core/UIComponent',
               ], function (UIComponent) {
	return UIComponent.extend('com.learning.Component',{
		metadata: {
			manifest: "json"
		},
		
		init: function () {
			
			UIComponent.prototype.init.apply(this, arguments);
			this._router = this.getRouter();

			// initialize the router
			this._router.initialize();
			//this._router.getTargets().display('welcome');
			
		},
		
		destroy: function () {
			
			console.log('before');
			window.open('http://www.google.com','_blank');
			UIComponent.prototype.destroy.apply(this, arguments);
			console.log('after');
			
		}
	});
});