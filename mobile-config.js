App.info({
    id: 'com.salontrap.app',
    version: '0.1.0',
    name: 'Hiyo',
    author: 'Hiyo Technologies',
    description: 'Hiyo is an event based vehicle sharing app which helps in sharing vehicles with co-attendees to the event venue.',
    email: 'hello@hiyoapp.com',
    website: 'http://hiyoapp.com'
});

App.setPreference('Orientation', 'portrait');

App.accessRule("*");


App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);

App.setPreference('WebAppStartupTimeout', 1000000);
App.setPreference("LoadUrlTimeoutValue", 1000000)
App.setPreference('ShowSplashScreenSpinner', 'true');
App.setPreference('SplashMaintainAspectRatio', 'true');
App.setPreference('FadeSplashScreen', 'true');
App.setPreference('FadeSplashScreenDuration', '1000');;
