module.exports = function(router,contactController){

router.route('/contacts').get(contactController.all);
router.route('/contactById').get(contactController.select);
router.route('/contacts').post(contactController.add);
router.route('/contacts').delete(contactController.del);
router.route('/contacts').put(contactController.update);
	
	
}
