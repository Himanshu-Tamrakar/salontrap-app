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
    'android_mdpi_portrait': 'resources/splash/drawable-mdpi/screen.png',
    'android_mdpi_landscape': 'resources/splash/drawable-land-mdpi/screen.png',
    'android_hdpi_portrait': 'resources/splash/drawable-hdpi/screen.png',
    'android_hdpi_landscape': 'resources/splash/drawable-land-hdpi/screen.png',
    'android_xhdpi_portrait': 'resources/splash/drawable-xhdpi/screen.png',
    'android_xhdpi_landscape': 'resources/splash/drawable-land-xhdpi/screen.png',
    'android_xxhdpi_portrait': 'resources/splash/drawable-xxhdpi/screen.png',
    'android_xxhdpi_landscape': 'resources/splash/drawable-land-xxhdpi/screen.png'
});

App.setPreference('WebAppStartupTimeout', 1000000);
App.setPreference("LoadUrlTimeoutValue", 1000000)
App.setPreference('ShowSplashScreenSpinner', 'true');
App.setPreference('SplashMaintainAspectRatio', 'true');
App.setPreference('FadeSplashScreen', 'true');
App.setPreference('FadeSplashScreenDuration', '1000');;
