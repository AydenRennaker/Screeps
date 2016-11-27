var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var target = creep.memory.target;
        var contX = creep.memory.contX;
        var contY = creep.memory.contY;
        var dest = creep.memory.dest;

	    if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
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
                var storage;
                if(dest == "W48N47"){
                  storage  = Game.getObjectById("58058b1d02a5ed1a461aab15");
                }else if(dest == "W48N48"){
                  storage = Game.getObjectById("580d1fade882580918c2b0b6");
                }else if(target == "W52N52" || target == "W53N51"){
                  storage = Game.getObjectById("58197a5988be51f37bd4ff1e");
                }else{
                  var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: (s) => (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_TOWER)
                                && s.energy < s.energyCapacity
                        })
                }

                if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }

                if(!storage){
                  var target = Game.getObjectById("581f3858a61b8d8f09d9833f");
                  if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                          creep.moveTo(target);
                  }
                }


	            }

	    }
	    else if((!creep.memory.working) && (target == creep.room.name)) {

          //var target = Game.getObjectById(creep.memory.source);

          var cont = creep.room.lookForAt(LOOK_STRUCTURES, contX, contY);


          if(creep.withdraw(cont[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(cont[0]);
          }

          if(cont[0] == undefined){

            var energyInRange = creep.room.find(FIND_DROPPED_ENERGY);

            energyInRange.sort((a,b) => b.energy - a.energy);
            if (energyInRange.length > 0){
                  creep.moveTo(energyInRange[0]);
                  var pickup = creep.pickup(energyInRange[0]);
            }
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

module.exports = roleHauler;
