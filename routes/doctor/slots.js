const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const slotController = require("../../controllers/doctor/slot");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const doctorController = require("../../controllers/doctor/doctor");
const log = require("../../helper/logger");
const Slots = mongoose.model("Slots");
let auth = require("../../helper/auth");
let _ = require("lodash");
var moment = require("moment");
const {
  split
} = require("lodash");
router.post("/", (req, res) => {
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  var arr = [];
  req.body.slotsArray.forEach(element => {
    console.log("🚀 ~ file: slots.js ~ line 23 ~ router.post ~ element", element)

    // let Mfrm = moment("1111-11-11T" + element.morningSlot.from + ":00.000Z")
    // let Mt = moment("1111-11-11T" + element.morningSlot.to + ":00.000Z")
    // let Afrm = moment("1111-11-11T" + element.afternoonSlot.from + ":00.000Z")
    // let At = moment("1111-11-11T" + element.afternoonSlot.to + ":00.000Z")
    // let Efrm = moment("1111-11-11T" + element.eveningSlot.from + ":00.000Z")
    // let Et = moment("1111-11-11T" + element.eveningSlot.to + ":00.000Z")
    // let Nfrm = moment("1111-11-11T" + element.nightSlot.from + ":00.000Z")
    // let Nt = moment("1111-11-11T" + element.nightSlot.to + ":00.000Z")

    let Mfrm = moment(element.morningSlot.from).format("HH:mm:ss.SSS[Z]")
    let Mt = moment(element.morningSlot.to).format("HH:mm:ss.SSS[Z]")
    let Afrm = moment(element.afternoonSlot.from).format("HH:mm:ss.SSS[Z]")
    let At = moment(element.afternoonSlot.to).format("HH:mm:ss.SSS[Z]")
    let Efrm = moment(element.eveningSlot.from).format("HH:mm:ss.SSS[Z]")
    let Et = moment(element.eveningSlot.to).format("HH:mm:ss.SSS[Z]")
    let Nfrm = moment(element.nightSlot.from).format("HH:mm:ss.SSS[Z]")
    let Nt = moment(element.nightSlot.to).format("HH:mm:ss.SSS[Z]")
    arr.push({
      userId: userId,
      day: element.day,
      morningSlot: {
        from: element.morningSlot.from,
        todt: Mt,
        fromdt: Mfrm,
        to: element.morningSlot.to
      },
      afternoonSlot: {
        from: element.afternoonSlot.from,
        todt: At,
        fromdt: Afrm,
        to: element.afternoonSlot.to
      },
      eveningSlot: {
        from: element.eveningSlot.from,
        todt: Et,
        fromdt: Efrm,
        to: element.eveningSlot.to
      },
      nightSlot: {
        from: element.nightSlot.from,
        todt: Nt,
        fromdt: Nfrm,
        to: element.nightSlot.to
      }
    })
  });
  crudController
    .insertMultiple(Slots, arr)
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/validate/morningSlot", auth, (req, res) => {
  log.debug("/api/profile/details");
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  crudController
    .getBy(Slots, {
      userId: userId,
      day: req.body.day,
      $or: [{
          $and: [{
            "morningSlot.todt": {
              $gte: "1111-11-11T" + req.body.from + ":00.000Z"
            },
          }, {
            "morningSlot.todt": {
              $lte: "1111-11-11T" + req.body.to + ":00.000Z"
            },
          }],
        },
        {
          $and: [{
              "morningSlot.fromdt": {
                $gte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "morningSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }, {
          $and: [{
              "morningSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "morningSlot.todt": {
                $gte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }
      ]
    })
    .then((slotData) => {
      var resp = true
      if (slotData[0]) {
        resp = false
        response.successResponse(res, 200, {
          slotData,
          resp
        });
      } else {
        response.successResponse(res, 200, resp)
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/validate/afternoonSlot", auth, (req, res) => {
  log.debug("/api/profile/details");
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  crudController
    .getBy(Slots, {
      userId: userId,
      day: req.body.day,
      $or: [{
          $and: [{
            "afternoonSlot.todt": {
              $gte: "1111-11-11T" + req.body.from + ":00.000Z"
            },
          }, {
            "afternoonSlot.todt": {
              $lte: "1111-11-11T" + req.body.to + ":00.000Z"
            },
          }],
        },
        {
          $and: [{
              "afternoonSlot.fromdt": {
                $gte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "afternoonSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }, {
          $and: [{
              "afternoonSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "afternoonSlot.todt": {
                $gte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }
      ]
    })
    .then((slotData) => {
      var resp = true
      if (slotData[0]) {
        resp = false
        response.successResponse(res, 200, {
          slotData,
          resp
        });
      } else {
        response.successResponse(res, 200, resp)
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
})

router.post("/validate/eveningSlot", auth, (req, res) => {
  log.debug("/api/profile/details");
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  crudController
    .getBy(Slots, {
      userId: userId,
      day: req.body.day,
      $or: [{
          $and: [{
            "eveningSlot.todt": {
              $gte: "1111-11-11T" + req.body.from + ":00.000Z"
            },
          }, {
            "eveningSlot.todt": {
              $lte: "1111-11-11T" + req.body.to + ":00.000Z"
            },
          }],
        },
        {
          $and: [{
              "eveningSlot.fromdt": {
                $gte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "eveningSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }, {
          $and: [{
              "eveningSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "eveningSlot.todt": {
                $gte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }
      ]
    })
    .then((slotData) => {
      var resp = true
      if (slotData[0]) {
        resp = false
        response.successResponse(res, 200, {
          slotData,
          resp
        });
      } else {
        response.successResponse(res, 200, resp)
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
})

router.post("/validate/nightSlot", auth, (req, res) => {
  log.debug("/api/profile/details");
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  crudController
    .getBy(Slots, {
      userId: userId,
      day: req.body.day,
      $or: [{
          $and: [{
            "nightSlot.todt": {
              $gte: "1111-11-11T" + req.body.from + ":00.000Z"
            },
          }, {
            "nightSlot.todt": {
              $lte: "1111-11-11T" + req.body.to + ":00.000Z"
            },
          }],
        },
        {
          $and: [{
              "nightSlot.fromdt": {
                $gte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "nightSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }, {
          $and: [{
              "nightSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "nightSlot.todt": {
                $gte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }
      ]
    })
    .then((slotData) => {
      var resp = true
      if (slotData[0]) {
        resp = false
        response.successResponse(res, 200, {
          slotData,
          resp
        });
      } else {
        response.successResponse(res, 200, resp)
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
})

router.get("/by/:userId", (req, res) => {
  log.debug("/api/get/slots");
  crudController
    .getBy(Slots, {
      userId: req.params.userId
    })
    .then((slotData) => {
      if (slotData) {
        response.successResponse(res, 200, slotData);
      } else {
        response.successResponse(res, 200, "true")
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/:userId", auth, (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .getBy(Slots, {
      userId: req.params.userId
    })
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/:id", auth, (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .getSingleRecordByPopulate(Slots, {
      _id: req.params.id
    }, "userId")
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/by/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .updateBy(Slots, req.params.id, req.body)
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getSlot/day/date", (req, res) => {
  log.debug("/api/getSlot/day/date");
  crudController
    .getBy(Slots, {
      _id: req.params.id
    }, "userId")
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add", auth, (req, res) => {
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  var arr = [];
  crudController.deleteMulti(Slots, {
    doctorId: userId,
    dayAndDate: req.body.dayAndDate
  }).then((delData) => {
    req.body.slotsArray.forEach(element => {
      arr.push({
        doctorId: userId,
        dayAndDate: req.body.dayAndDate,
        revisited: element.revisited,
        startTime: element.startTime,
        endTime: element.endTime
      })
    });
    crudController
      .insertMultiple(Slots, arr)
      .then((slotData) => {
        response.successResponse(res, 200, slotData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  }).catch((error) => {
    log.error(error);
    response.errorResponse(res, 500);
  })
});

router.post("/getSlotBy", auth, (req, res) => {
  log.debug("/api/getSlot/day/date/doctorId");
  var obj = {
    $and: [{
        dayAndDate: req.body.dayAndDate
      },
      {
        doctorId: req.userId
      }
    ]
  }
  console.log("obj", obj)
  crudController
    .getBy(Slots, obj)
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add/same/slots", auth, (req, res) => {
  log.debug("/api/add/same/slots")
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  var arr = [];
  Slots.find({
    _id: {
      $in: req.body.idArray
    }
  }, {
    "startTime": 1,
    "endTime": 1,
    "revisited": 1
  }).then((slotData) => {
    var arr2 = [];
    req.body.mainArray.forEach(element => {
      slotData.forEach(ele => {
        arr2.push({
          doctorId: userId,
          dayAndDate: element,
          revisited: ele.revisited,
          startTime: ele.startTime,
          endTime: ele.endTime
        })
      });
    });
    // var deleteObj = {
    //   $and: [{
    //       doctorId: userId
    //     },
    //     {
    //       dayAndDate: {
    //         $in: arr2.dayAndDate
    //       }
    //     }
    //   ]
    // }
    var deleteObj = []
    for (let i = 0; i < req.body.mainArray.length; i++) {
      deleteObj[i] = {
        doctorId: req.userId,
        dayAndDate: req.body.mainArray[i]
      }
    }

    const resObj = {
      ...deleteObj
    }

    console.log(deleteObj.doctorId)
    // var resObj = Object.assign({}, deleteObj);
    crudController.getBy(Slots, resObj).then((delData) => {
      console.log("=====>>>", delData)
      // crudController
      //   .insertMultiple(Slots, arr2)
      //   .then((slotData) => {
      response.successResponse(res, 200, delData);
      //   })
      //   .catch((error) => {
      //     log.error(error);
      //     response.errorResponse(res, 500);
      //   });
    }).catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
  }).catch((error) => {
    log.error(error);
    response.errorResponse(res, 500);
  })
});

router.post("/get/time/intervals", (req, res) => {
  const splitTime = (startTime, endTime, interval) => {
    const result = [startTime.toString()];
    let time = startTime.add(interval, 'm');
    while (time.isBetween(startTime, endTime, undefined, [])) {
      result.push(time.toString());
      time = time.add(interval, 'm');
    }
    return result;
  }


  const obj = {
    dayAndDate: req.body.dayAndDate,
    doctorId: req.body.doctorId
  }

  var s1, s2, s3, s4, t1, t2, t3, t4
  crudController.getOne(Slots, obj).then((resData) => {
    s1 = resData.startTime.split(":")
    t1 = s1[0]
    s2 = s1[1].split(" ")
    t2 = s2[0]
    s3 = resData.endTime.split(":")
    t3 = s3[0]
    s4 = s3[1].split(" ")
    t4 = s4[0]
    console.log(t1, t2, t3, t4)

    const interval = resData.duration;
    const startTime = moment({
      hour: t1,
      minute: t2
    });
    console.log("startTime", startTime)
    const endTime = moment({
      hour: t3,
      minute: t4
    });
    console.log("=====>>>>>>", startTime, endTime, interval)
    const timeSlices = splitTime(startTime, endTime, interval);

    // For printing out the intervals 
    var timeArray = []
    for (let i = 0; i < timeSlices.length - 1; i++) {

      timeArray.push(moment(timeSlices[i]).format("hh:mm A") + " - " + moment(timeSlices[i + 1]).format("hh:mm A"))
    }
    response.successResponse(res, 200, {
      resData,
      timeArray
    })
  }).catch((error) => {
    response.errorMsgResponse(res, 301, error)
  })



  // You change these values according to your needs

  // const interval = 15;
  // const startTime = moment({hour:t1,minute:t2});
  // console.log("startTime" , startTime)
  // const endTime = moment({hour:t3, minute:t4});

  // const timeSlices = splitTime(startTime,endTime,interval); 

  // // For printing out the intervals 
  // var timeArray =[]
  // for(let i=0;i<timeSlices.length-1;i++){
  //   timeArray.push(timeSlices[i]+" - "+timeSlices[i+1])
  // }
  // response.successResponse(res , 200 , timeArray)
})

module.exports = router;