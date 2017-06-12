import {
    Mongo
} from 'meteor/mongo';
// export const Users = new Mongo.Collection('shops');

// Make it all for only Admin can perform insert, update, remove
Meteor.users.allow({
    insert(userId, party) {
        return true;
    },
    update(userId, party, field, modifier) {
        return true;
    },
    remove(userId, party) {
        return true;
    }
})
