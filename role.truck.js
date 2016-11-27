var roleTruck = {

    /** @param {Creep} creep **/
    run: function(creep) {
      
	    if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true;
	    }

	    if(creep.memory.working) {
            if(creep.memory.varry){
              var EnergyStructures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                    || s.structureType == STRUCTURE_EXTENSION
                                    || s.structureType == STRUCTURE_TOWER
                                    || s.structureType == STRUCTURE_STORAGE)
                                    && s.energy < s.energyCapacity-creep.carryCapacity
                })
                if(EnergyStructures != undefined){
                    if(creep.transfer(EnergyStructures, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(EnergyStructures);
                        return;
                    }
                }
            }
            var target = Game.getObjectById(creep.memory.dest);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }

	    }
	    else {

	        var energyInRange = creep.pos.findInRange(FIND_DROPPED_ENERGY, 9);
          if(energyInRange[0] == undefined){
            var target = Game.getObjectById(creep.memory.source);
              if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(target);
              }
          }else{
            if (energyInRange[0].energy > 300){
                  creep.moveTo(energyInRange[0]);
                  var pickup = creep.pickup(energyInRange[0]);
            }else{
              var target = Game.getObjectById(creep.memory.source);
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
          }




	    }
	}
};

module.exports = roleTruck;
