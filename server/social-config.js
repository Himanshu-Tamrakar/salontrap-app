ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.remove({
    service: 'google'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',

    appId: 'appId',
    secret: 'secret'
});
ServiceConfiguration.configurations.insert({
    service: 'google',

    clientId: 'clientId',
    secret: 'secret'
});
