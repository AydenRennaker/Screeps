var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.target == ("W48N47" || "W48N48")){
          var x = creep.memory.x;
          var y = creep.memory.y;
          var s = creep.memory.source;

          var targetPos = new RoomPosition(x, y, creep.memory.target);

          if(creep.pos.isEqualTo(targetPos)) {
              creep.harvest(Game.getObjectById(s));
          }else{
            creep.moveTo(targetPos);
          }
          return;
        }

      }
    };

    module.exports = roleHarvester;
    //
    //
    //           }
    //     }
    //       else if(creep.carry.energy > 0) {
    //             creep.memory.action = "work";
    //             if((creep.room.name != spawn) && (creep.room.name != "W48N48")){
    //                 var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);//creep.room.find(FIND_CONSTRUCTION_SITES);
    //                 if(target) {
    //                     if(creep.build(target) == ERR_NOT_IN_RANGE) {
    //                         creep.moveTo(target);
    //                     }
    //                 }else{
    //                     var target = creep.pos.findInRange(FIND_STRUCTURES, 2,
    //                                 {filter: object => object.hits < object.hitsMax && object.structureType == (STRUCTURE_CONTAINER || STRUCTURE_ROAD)
    //                     });
    //                     if(target) {
    //                         if(creep.repair(target[0]) == OK) {
    //
    //                         }else{
    //                             var containers = creep.pos.findInRange(FIND_STRUCTURES, 1,
    //                                     {filter: {structureType: STRUCTURE_CONTAINER}});
    //
    //                             if(containers.length > 0){
    //                                 creep.transfer(containers[0], RESOURCE_ENERGY);
    //                             }else{
    //                                 creep.drop(RESOURCE_ENERGY);
    //                             }
    //                         }
    //                     }
    //
    //
    //                 }
    //             }else{
    //                 var containers = creep.pos.findInRange(FIND_STRUCTURES, 1,
    //                         {filter: {structureType: STRUCTURE_CONTAINER}});
    //
    //                 if(containers.length > 0){
    //                     creep.transfer(containers[0], RESOURCE_ENERGY);
    //                 }else{
    //                     creep.drop(RESOURCE_ENERGY);
    //                 }
    //             }
    //
    //
    //       }
    //     else if(creep.carry.energy == 0){
    //             creep.memory.action = "collect";
    //     }
    // }
