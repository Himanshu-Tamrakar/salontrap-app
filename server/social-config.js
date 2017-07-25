ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.remove({
    service: 'google'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',

    appId: '468465353496646',
    secret: 'e8c4373587fc87d1454c576e50ee653d'
});

ServiceConfiguration.configurations.insert({
    service: 'google',

    clientId: '412632490346-oap9pkngua0khomn5ckvje1685fcnr6c.apps.googleusercontent.com',
    secret: 'q9PsmIajlozNUl_FIhEp24qt'
});
