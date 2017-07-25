ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.remove({
    service: 'google'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',

    appId: '668120650049837',
    secret: '8fe3d455e0e7a99ad4a54e35c4a1513d'
});
ServiceConfiguration.configurations.insert({
    service: 'google',

    clientId: '412632490346-oap9pkngua0khomn5ckvje1685fcnr6c.apps.googleusercontent.com',
    secret: 'q9PsmIajlozNUl_FIhEp24qt'
});
