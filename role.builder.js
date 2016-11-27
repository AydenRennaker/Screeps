var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

      // if(creep.room.name == "W48N46"){
      //   var targets = creep.pos.findClosestByRange(FIND_STRUCTURES);
      //   if(creep.dismantle(targets) == ERR_NOT_IN_RANGE){
      //     creep.moveTo(targets);
      //   }
      //   return;
      // }

      var target = creep.memory.target;
      if(target != creep.room.name){
            var route = Game.map.findRoute(creep.room, target);
            if(route.length > 0) {
                var exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
                return;
            }
      }

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
        var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);//creep.room.find(FIND_CONSTRUCTION_SITES);
          if(target != undefined) {
              if(creep.build(target) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(target);
              }
          }else{
              var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                  filter: object => object.hits < (object.hitsMax) || (250000)
              });

              //targets.sort((a,b) => a.hits - b.hits);

              if(targets != undefined) {
                  if(creep.repair(targets) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(targets);
                  }
              }
          }
                /*

	            var target = new RoomPosition(41, 18, creep.memory.target);
                if(target != undefined) {

                    var target = creep.pos.findClosestByRange(FIND_STRUCTURES,
	                    {filter: {structureType: STRUCTURE_CONTAINER}});
                    console.log(creep.dismantle(target));
                    if(creep.dismantle(target) == ERR_NOT_IN_RANGE || -7) {
                        creep.moveTo(target);
                    }
                }
                */


	        }
	    else {

	        var energyInRange = creep.pos.findInRange(FIND_DROPPED_ENERGY, 40);

	        if (creep.pos.getRangeTo(energyInRange[0]) > 1)
                creep.moveTo(energyInRange[0]);
            var pickup = creep.pickup(energyInRange[0]);
            if(creep.room.name == "W48N47" || "W48N48"){
              var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                      filter: (s) => (s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 0) ||
                      (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 200)
              })
              if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(Container);
              }
            }else{
              var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                      filter: (s) => s.structureType == STRUCTURE_CONTAINER
                                  && s.store[RESOURCE_ENERGY] > 0
              })
              if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(Container);
              }
            }


            /*
            var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER
                                && s.store[RESOURCE_ENERGY] > 200
            })
            if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container)
            } */

	        /* var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            } */
	    }


	}
};

module.exports = roleBuilder;
