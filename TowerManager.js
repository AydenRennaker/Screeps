module.exports = {

    run: function(){

			for(var name in Game.rooms) {

	    var towers = Game.rooms[name].find(
	    					 FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
		    		 if(towers.length > 0){
		    					for(var i in towers){
											var closestHostile = towers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
											if(closestHostile) {
													towers[i].attack(closestHostile);
											}else{
													var targets = towers[i].room.find(FIND_STRUCTURES, {
															filter: object => (object.hits < object.hitsMax && object.hits < 300000 && object.structureType != STRUCTURE_ROAD) || (object.hits < 4000 && object.structureType == STRUCTURE_ROAD)
													});
                          targets.sort((a,b) => a.hits - b.hits);

													if(targets) {
															towers[i].repair(targets[0]);
													}
											}
									}
		    		}
	    }


		}

}
