Meteor.startup(function() {

    Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://ec2-35-154-84-117.ap-south-1.compute.amazonaws.com';
    process.env.ROOT_URL = "http://ec2-35-154-84-117.ap-south-1.compute.amazonaws.com/";
});
