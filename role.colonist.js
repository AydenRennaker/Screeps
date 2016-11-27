var roleColonist = {

run: function (creep) {
    var targetRoom = creep.memory.target;

    if(creep.room.name == "W51N50"){
      creep.memory.target = "W53N50";
    }else if( creep.room.name == "W53N50"){
      creep.memory.target = "W53N52";
    }
    if(targetRoom != creep.room.name){
	    var route = Game.map.findRoute(creep.room, targetRoom);
        if(route.length > 0) {
            var exit = creep.pos.findClosestByRange(route[0].exit);
            creep.moveTo(exit);
        }
    }else{
        if(creep.room.name == "W53N52"){
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
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller);
                }
              }
          }else{
            var target = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(target) == ERR_NOT_IN_RANGE){
              creep.moveTo(target);
            }
          }
        }


    }

}
};

module.exports = roleColonist;
