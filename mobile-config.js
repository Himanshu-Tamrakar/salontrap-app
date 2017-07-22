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


App.icons({
    'android_mdpi': 'resources/icons/mipmap-mdpi/ic_launcher.png',
    'android_hdpi': 'resources/icons/mipmap-hdpi/ic_launcher.png',
    'android_xhdpi': 'resources/icons/mipmap-xhdpi/ic_launcher.png',
    'android_xxhdpi': 'resources/icons/mipmap-xxhdpi/ic_launcher.png',
    'android_xxxhdpi': 'resources/icons/mipmap-xxxhdpi/ic_launcher.png'
});

App.launchScreens({
    'android_mdpi_portrait': 'resources/splash/drawable-mdpi/screen.9.png',
    'android_hdpi_portrait': 'resources/splash/drawable-hdpi/screen.9.png',
    'android_xhdpi_portrait': 'resources/splash/drawable-xhdpi/screen.9.png',
    'android_xxhdpi_portrait': 'resources/splash/drawable-xxhdpi/screen.9.png',
    'android_xxxhdpi_portrait': 'resources/splash/drawable-xxxhdpi/screen.9.png',

});

App.setPreference('WebAppStartupTimeout', 1000000);
App.setPreference("LoadUrlTimeoutValue", 1000000)
App.setPreference('ShowSplashScreenSpinner', 'true');
App.setPreference('SplashMaintainAspectRatio', 'true');
App.setPreference('FadeSplashScreen', 'true');
App.setPreference('FadeSplashScreenDuration', '1000');;
