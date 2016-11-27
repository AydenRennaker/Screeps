var roleMinecart = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var target = creep.memory.target;
        var contX = creep.memory.contX;
        var contY = creep.memory.contY;
        var dest = "W48N47";

	    if(creep.memory.working && _.sum(creep.carry) == 0) {
            creep.memory.working = false;
	    }
	    if(!creep.memory.working && _.sum(creep.carry) == creep.carryCapacity) {
	        creep.memory.working = true;
	    }

	    if(creep.memory.working) {

	            if(creep.room.name != dest){

    	            var route = Game.map.findRoute(creep.room, dest);
                    if(route.length > 0) {
                        var exit = creep.pos.findClosestByRange(route[0].exit);
                        creep.moveTo(exit);
                    }
	            }else{
                var terminal = Game.getObjectById("580d26fd8e7ef04e4da04656");

                if(creep.transfer(terminal, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(terminal);
                }


	            }

	    }
	    else if((!creep.memory.working) && (target == creep.room.name)) {

          var target = Game.getObjectById("5810adce8eed19df4e8f6888");

          //var cont = creep.room.lookForAt(LOOK_STRUCTURES, contX, contY);

          if(creep.withdraw(target, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target);
          }

	        // var energyInRange = creep.room.find(FIND_DROPPED_ENERGY);
          //
	        // if (energyInRange.length > 0){
          //       creep.moveTo(energyInRange[0], {reusePath: 8});
          //       var pickup = creep.pickup(energyInRange[0]);
	        // }else{
	        //    Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          //               filter: (s) => (s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER)
          //                           && s.store[RESOURCE_ENERGY] > 500
          //       })
          //       if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          //           creep.moveTo(Container, {reusePath: 8})
          //       }
	        // }

	    }else if(!(creep.memory.working) && (target != creep.room.name)) {

        	var route = Game.map.findRoute(creep.room, target);
            if(route.length > 0) {
                var exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);

            }
	    }
	}
};

module.exports = roleMinecart;
