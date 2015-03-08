var weapon = function() {

	var damage = 10;

	var that = {};

	that.getDamage = function(){
		return damage;
	}

	return that;
}