App.info({
    id: 'com.saloncare.app',
    version: '0.1.0',
    name: 'SalonCare',
    description: "SalonCare is a network of Salon's and spas With us now you can book you salon in just your finger tips , Now no more waiting in the salon just select your time and enjoy the service.",
    // email: 'hello@hiyoapp.com',
    // website: 'http://hiyoapp.com'
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
