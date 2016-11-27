var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

      if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
      }
      if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
          creep.memory.building = true;
      }

      if(creep.memory.building) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
            creep.moveTo(creep.room.controller);
        }

      }else{
        var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0) ||
                (s.energy > 0 && s.structureType == STRUCTURE_LINK)

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

      }



    }
};

module.exports = roleUpgrader;
