var roleHaul = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('Refill');
	    }

	    if(creep.memory.building) {
	        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                })
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
            }

            if(!target){
              var target = Game.getObjectById("581f3858a61b8d8f09d9833f");
              if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(target);
              }
            }
	    }
	    else {

	           var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_TERMINAL) && s.store[RESOURCE_ENERGY] > 0
                })
                if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Container);
                }
                if(!Container){

                  var energyInRange = creep.room.find(FIND_DROPPED_ENERGY);

                  energyInRange.sort((a,b) => b.energy - a.energy);
                  if (energyInRange.length > 0){
                        creep.moveTo(energyInRange[0]);
                        var pickup = creep.pickup(energyInRange[0]);
                  }
                }

	        /* var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            } */
	    }
	}
};

module.exports = roleHaul;
