var roleMelee = {

run: function (creep) {
        var loc = new RoomPosition(39, 46, "W53N52");

        //console.log(creep.moveTo(loc));
        // if(creep.attack(creep.room.find(FIND_HOSTILE_SPAWNS)) == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(creep.room.find(FIND_HOSTILE_SPAWNS));
        //     return;
        // }

        if(creep.room.name == "W53N52"){
          creep.moveTo(loc);

          var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
          if(targets.length > 0) {
              creep.rangedAttack(targets[0]);
          }
          return;
        }

        if(creep.memory.flag == "Flag2"){
          if(creep.room.name != "W48N46"){
            var route = Game.map.findRoute(creep.room, "W48N46");
            if(route.length > 0) {
                var exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
                return;
            }
          }
          //creep.moveTo(creep.room.find(FIND_HOSTILE_SPAWNS));
          if(creep.attack(creep.room.find(FIND_HOSTILE_SPAWNS)) == ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.find(FIND_HOSTILE_SPAWNS));
              return;
          }
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES,{
                filter: object => object.hits < 130000 && (object.structureType != STRUCTURE_SPAWN || STRUCTURE_ROAD)
            });
            if(targets){
              if(creep.attack(targets) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(targets);
              }
              creep.rangedAttack(targets);
              return;
            }
        }else{

          if(creep.memory.flag != undefined){
                creep.moveTo(Game.flags[creep.memory.flag]);

            }

          var hostileCreeps = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 40);
          //var target = new RoomPosition(22, 3, creep.memory.target);
          if (hostileCreeps.length > 0) {
              creep.moveTo(hostileCreeps[0]);
              creep.attack(hostileCreeps[0]);

              var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
              if(targets.length > 0) {
                  creep.rangedAttack(targets[0]);
              }
          }



          if(creep.memory.target != creep.room.name){
                var route = Game.map.findRoute(creep.room, creep.memory.target);
                if(route.length > 0) {
                    var exit = creep.pos.findClosestByRange(route[0].exit);
                    creep.moveTo(exit);
                }
          }

          else {


                //return;
                  //console.log(creep.attack(Game.getObjectById("580e8542f01ee3940317d623")));
                      // if(creep.attack(target) == ERR_NOT_IN_RANGE || -7) {
                      //     creep.moveTo(target);
                      //     return;
                      // }


                  if(creep.attack(creep.room.find(FIND_HOSTILE_SPAWNS)) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(creep.room.find(FIND_HOSTILE_SPAWNS));
                  }


              }
          }

        }

      // if(creep.memory.flag != undefined){
      //       creep.moveTo(Game.flags[creep.memory.flag]);
      //       return;
      //   }

        // var structures = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.structureType != STRUCTURE_SPAWN || STRUCTURE_WALL
        // });
        // if(creep.attack(structures) == ERR_NOT_IN_RANGE) {
        //      creep.moveTo(structures);
        //      //return;
        //  }



};

module.exports = roleMelee;
