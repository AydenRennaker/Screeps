var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    var vein = creep.memory.vein;
        var target = creep.memory.target;

        var repair = creep.pos.findInRange(FIND_STRUCTURES, 2,
                    {filter: object => object.hits < object.hitsMax && object.hits < 230000 && object.structureType == (STRUCTURE_CONTAINER || STRUCTURE_ROAD)
        });

        var build = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 3);
        //                 if(target) {
        //                     if(creep.build(target) == ERR_NOT_IN_RANGE) {
        //                         creep.moveTo(target);
        //                     }
        //                 }


        if(creep.memory.target == ("W48N47" || "W48N48")){
          var x = creep.memory.x;
          var y = creep.memory.y;
          var s = creep.memory.source;

          var targetPos = new RoomPosition(x, y, target);

          if(creep.pos.isEqualTo(targetPos)) {
              creep.harvest(Game.getObjectById(s));
          }else{
            creep.moveTo(targetPos);
          }
          return;
        }

        if(creep.room.name != target){
              var route = Game.map.findRoute(creep.room, target);
              if(route.length > 0) {
                  var exit = creep.pos.findClosestByRange(route[0].exit);
                  creep.moveTo(exit);
                  return;
              }

        }
        if(creep.carry.energy > 45 && build[0] != undefined){
          creep.build(build[0]);
        }else if(creep.carry.energy > 30 && repair[0] != undefined){
          creep.repair(repair[0]);
        }else{
          var x = creep.memory.x;
          var y = creep.memory.y;
          var s = creep.memory.source;

          var targetPos = new RoomPosition(x, y, target);

          if(creep.pos.isEqualTo(targetPos)) {
              creep.harvest(Game.getObjectById(s));
          }else{
            creep.moveTo(targetPos);
            //console.log(creep.id);
          }
        }

      }
    };

    module.exports = roleMiner;
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
