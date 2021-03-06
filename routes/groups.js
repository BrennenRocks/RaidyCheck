const express = require('express'),
  mongoose = require('mongoose'),
  fuzzy = require('fuzzy'),
  fs = require('fs'),
  json2csv = require('json2csv').parse,
  _ = require('lodash');
  
router = express.Router();
  
const User = require('../models/user'),
  Group = require('../models/group');
  
const constants = require('../config/constants'),
  middleware = require('../middleware');

/*=======================
   Register a new group

   req.body {
     *title: String,
     isPublic: boolean,
     allowOthersToUpdateCharacters: boolean
   }
=========================*/
router.post('/groups/new', middleware.getAuthToken, (req, res) => {
  if (!req.body.title) {
    return res.json({ success: false, message: 'No title was provided' });
  }
  //Find out who is logged in so we can link the group to them
  User.findOne({ _id: req.decodedUser.id }, 'groups inset', (err, user) => {
    if (err) {
      console.log('/groups/new finding user', err);
      return res.json({ success: false, message: constants.errMsg });
    }

    if (!user) {
      return res.json({ success: false, message: constants.userNotFound });
    }

    new Group({
      title: req.body.title,
      owner: req.decodedUser.bnet.battletag,
      image: user.inset,
      isPublic: req.body.isPublic,
      allowOthersToUpdateCharacters: req.body.allowOthersToUpdateCharacters,
    }).save((err, group) => {
      if (err) {
        if (err.errors.title) {
          return res.json({ success: false, message: err.errors.title.message });
        }
        
        console.log('/groups/new saving group', err);
        return res.json({ success: false, message: constants.errMsg });
      }
      //Attach the new group to the logged in user
      user.groups.personal.push(group._id);
      user.save((err) => {
        if (err) {
          console.log('groups/new saving user', err);
          return res.json({ success: false, message: constants.errMsg });
        }
        
        return res.json({ success: true, message: '', group: group });
      });
    });
  });
});

/*=====================
   Get a single group

   req.params {
     groupId - the Group ID
   }
=======================*/
router.get('/groups/:groupId', (req, res) => {
  Group.findOne({ _id: req.params.groupId }).populate('characters').exec((err, group) => {
    if (err) {
      console.log('/groups/:groupId finding group', err)
      return res.json({ success: false, message: constants.errMsg });
    }

    if (!group) {
      return res.json({ success: false, message: constants.groupNotFound });
    }

    return res.json({ success: true, message: '', group: group });
  });
});

/*====================================
   Get all groups of logged in User
======================================*/
router.get('/groups', middleware.getAuthToken, (req, res) => {
  User.findOne({ _id: req.decodedUser.id }).populate('groups.personal groups.favorites').exec((err, user) => {
      if (err) {
        console.log('/groups finding User', err);
        return res.json({ success: false, message: constants.errMsg });
      }
      
      if (!user) {
        return res.json({ success: false, message: constants.userNotFound });
      }
      
      return res.json({ success: true, message: '', user: user });
    });
});

/*=======================
   Update a single group

   req.params {
     groupId - the Group ID
   }

   req.body {
     *title: String,
     *isPublic: boolean,
     *allowOthersToUpdateCharacters: boolean
   }
=========================*/
router.put('/groups/update/:groupId', middleware.getAuthToken, middleware.checkGroupOwnership, (req, res) => {
  if (!req.body.title) {
    return res.json({ success: false, message: 'No title provided' });
  }

  if (!req.body.isPublic) {
    return res.json({ success: false, message: 'No public or private field provided' });
  }

  if (!req.body.allowOthersToUpdateCharacters) {
    return res.json({ success: false, message: 'No option to allow others to update characters provided' });
  }

  Group.findOne({ _id: req.params.groupId }, (err, group) => {
    if (err) {
      console.log('/groups/update/:groupId finding group', err);
      return res.json({ success: false, message: constants.errMsg });
    }

    if (!group) {
      return res.json({ success: false, message: constants.groupNotFound });
    }

    group.title = req.body.title;
    group.isPublic = req.body.isPublic;
    group.allowOthersToUpdateCharacters = req.body.allowOthersToUpdateCharacters;

    group.save((err, savedGroup) => {
      if (err) {
        if (err.errors.title) {
          return res.json({ success: false, message: err.errors.title.message });
        }

        console.log('/groups/update/:groupId saving group', err); 
        return res.json({ success: false, message: constants.errMsg });
      }

      Group.findOne({ _id: savedGroup._id }).populate('characters').exec((err, group) => {
        if (err) {
          console.log('/groups/update/:groupId finding group', err)
          return res.json({ success: false, message: constants.errMsg });
        }
    
        if (!group) {
          return res.json({ success: false, message: constants.groupNotFound });
        }
        
        return res.json({ success: true, message: '', group: group });
      });
    });
  });
});

/*=======================
   Delete a single group

   req.params {
     groupId - the Group ID
   }
=========================*/
router.delete('/groups/delete/:groupId', middleware.getAuthToken, middleware.checkGroupOwnership, (req, res) => {
  Group.findOne({ _id: req.params.groupId }, (err, group) => {
    if (err) {
      console.log('/groups/delete/:groupId finding group', err);
      return res.json({ success: false, message: constants.errMsg });
    }

    if (!group) {
      return res.json({ success: false, message: constants.groupNotFound });
    }

    User.findOne({ _id: req.decodedUser.id }, (err, user) => {
      if (err) {
        console.log('/groups/delete/:groupId finding user', err);
        return res.json({ success: false, message: constants.userNotFound });
      }

      if (user.groups.personal.length == 1) {
        return res.json({ success: false, message: 'You only have one group left, you cannot delete it' });
      }

      User.find({ 'bnet.battletag': { $in: group.favoritedBy } }, (err, users) => {
        if (err) {
          console.log('/groups/delete/:groupId finding users who have favorited this group', err);
          return res.json({ success: false, message: constants.errMsg });
        }

        // const bulkUpdateOps = [];
        //If a different user has favorited this group, remove it
        console.log(group._id);
        if (users.length > 0) {
          users.map(singleUser => {
            if (user.bnet.battletag !== singleUser.bnet.battletag) {
              singleUser.groups.favorites.remove(group._id);
              singleUser.save();
            }
            // bulkUpdateOps.push({
            //   updateOne: {
            //     filter: { _id: singleUser._id },
            //     update: { $pull: { 'singleUser.groups.favorites': new mongoose.Types.ObjectId(req.params.groupId) }}
            //   }
            // });
          });

          // User.bulkWrite(bulkUpdateOps, (err, data) => {
          //   if (err) {
          //     console.log('/groups/delete/:groupId bulk writing users', err);
          //     return res.json({ success: false, message: constants.errMsg });
          //   }
            
          //   console.log('data', data);
          // });
        }

        group.remove(err => {
          if (err) {
            console.log('/groups/delete/:groupId removing group', err);
            return res.json({ success: false, message: constants.errMsg });
          }
          user.groups.favorites.remove(group._id);
          user.groups.personal.splice(user.groups.personal.indexOf(group._id), 1);
          user.save(err => {
            if (err) {
              console.log('/groups/delete/:groupId saving user', err);
              return res.json({ success: false, message: constants.errMsg });
            }

            return res.json({ success: true, message: 'Group successfully deleted' });
          });
        });
      });
    });
  });
});

/*=======================================
   Favorite or Unfavorite a single group

   req.params {
     groupId - the Group ID
   }
=========================================*/
router.put('/groups/favorite/:groupId', middleware.getAuthToken, (req, res) => {
  Group.findOne({ _id: req.params.groupId }, (err, group) => {
    if (err) {
      console.log('/groups/favorite/:groupId finding group', err);
      return res.json({ success: false, message: constants.errMsg });
    }

    if (!group) {
      return res.json({ success: false, message: constants.groupNotFound });
    }

    User.findOne({ _id: req.decodedUser.id }, (err, user) => {
      if (err) {
        console.log('/groups/favorite/:groupId finding user', err);
        return res.json({ success: false, message: constants.errMsg });
      }

      if (!user) {
        return res.json({ success: false, message: constants.userNotFound });
      }

      // If user has already favorited the group, decrement count and remove them
      if (_.includes(group.favoritedBy, user.bnet.battletag)) {
        user.groups.favorites.splice(user.groups.favorites.indexOf(group._id), 1);
        group.favoritesCount--;
        group.favoritedBy.splice(group.favoritedBy.indexOf(user.bnet.battletag), 1);
      } else {
        user.groups.favorites.push(group._id);
        group.favoritesCount++;
        group.favoritedBy.push(user.bnet.battletag);
      }
      
      group.save(err => {
        if (err) {
          console.log('/groups/favorite/:groupId saving group', err);
          return res.json({ success: false, message: constants.errMsg });
        }
        user.save(err => {
          if (err) {
            console.log('/groups/favorite/:groupId saving user', err);
            return res.json({ success: false, message: constants.errMsg });
          }

          return res.json({ success: true, message: '' });
        });
      });
    });
  });
});

/*=======================================
   Fuzzy Search for Groups by title

   req.body {
     *query: string
   }
=========================================*/
router.post('/groups/search', (req, res) => {
  Group.find({ isPublic: true }, 'title owner', (err, groups) => {
    if (err) {
      console.log('/groups/search finding groups', err);
      return res.json({ success: false, message: constants.errMsg });
    }

    const options = {
      pre: '<',
      post: '>',
      extract: function(el) { return el.title; }
    };

    const results = fuzzy.filter(req.body.query, groups, options);
    const matches = results.map(function(el) { return el.original; });

    return res.json({ success: true, message: '', groups: matches });

  });
});

/*=======================================
   Download characters in the group to csv

   req.params {
     groupId - the Group ID
   }
=========================================*/
router.get('/groups/download/:groupId', (req, res) => {
  Group.findById(req.params.groupId).populate('characters').exec((err, group) => {
    if (err) {
      console.log('/groups/download/:groupId', err);
      return res.json({ success: false, message: constants.errMsg });
    }

    if (!group) {
      return res.json({ success: false, message: constants.groupNotFound });
    }
    
    const data = [];
    group.characters.map(char => {
      data.push({
        name: char.cid.name,
        realm: char.cid.realm,
        head: char.items.head.itemLevel,
        neck: char.items.neck.itemLevel,
        shoulder: char.items.shoulder.itemLevel,
        back: char.items.back.itemLevel,
        chest: char.items.chest.itemLevel,
        wrist: char.items.wrist.itemLevel,
        hands: char.items.hands.itemLevel,
        waist: char.items.waist.itemLevel,
        legs: char.items.legs.itemLevel,
        feet: char.items.feet.itemLevel,
        finger1: char.items.finger1.itemLevel,
        finger2: char.items.finger2.itemLevel,
        trinket1: char.items.trinket1.itemLevel,
        trinket2: char.items.trinket2.itemLevel,
        mainHand: char.items.mainHand.itemLevel,
        offHand: char.items.offHand.itemLevel,
      });
    });

    const fields = ['name', 'realm', 'head', 'neck', 'shoulder', 'back', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet', 'finger1', 'finger2', 'trinket1', 'trinket2', 'mainHand', 'offHand'];
    const csv = json2csv(data, { fields: fields });

    const path = './files/' + group.title + '.csv';
    fs.writeFile(path, csv, (err, data) => {
      if (err) {
        console.log('/group/download/:groupId saving csv', err);
        return res.json({ success: false, message: constants.errMsg });
      }

      res.download(path);
      // fs.unlink(path, (err) => {});
    });
  });
});

module.exports = router;