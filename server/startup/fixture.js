import {
  Meteor
} from 'meteor/meteor';
import {
  Locations
} from '../../imports/api/locations';
import {
  Services
} from '../../imports/api/services';
import {
  Shops
} from '../../imports/api/shops'
import {
  ShopServices
} from '../../imports/api/shopServices'


Meteor.startup(() => {
  // Location Inserted
  // if (Locations.find().count() === 0) {
  //   const locations = [{
  //     'name': 'Porur, Chennai, Tamil Nadu, India'
  //   }, {
  //     'name': 'Ramapuram, Chennai, Tamil Nadu, India'
  //   }, {
  //     'name': 'Iyappanthangal, Chennai, Tamil Nadu, India'
  //   }];
  //
  //   locations.forEach((location) => {
  //     Locations.insert(location)
  //   });
  // }
  //
  // // Service Inserted
  // if (Services.find().count() === 0) {
  //   const services = [{
  //     'name': 'Hair Cut'
  //   }, {
  //     'name': 'Facial'
  //   }, {
  //     'name': 'Body Massage'
  //   }, {
  //     'name': 'Hair Colouring'
  //   }];
  //
  //   services.forEach((service) => {
  //     Services.insert(service)
  //   });
  // }
  //
  // // Shops Inserted
  // if (Shops.find().count() === 0) {
  //   const shops = [{
  //     'name': 'Radiance Ladies Salon, Spa & Academy (Evershine City)',
  //     'serviceId': "null",
  //     'type': 'WOMEN ONLY',
  //     'description': 'Searches for Facial in Lokhandwala, Mumbai Found363salons and services around you',
  //     'location': {
  //       "_id": "6qEo6yR88WZQdbCEJ",
  //       "name": "Porur, Chennai, Tamil Nadu",
  //       "shopLocation": "Opposite KFC, Bandra West 1.1 km Away"
  //
  //     },
  //     'images': ["https://d3p959fz8jdi04.cloudfront.net/suggestadoc/images/gallery/salons/images/1529/thumbs/52b9360cef036b11fd779366602b6e1f.JPG", "https://d3p959fz8jdi04.cloudfront.net/suggestadoc/images/gallery/salons/images/1529/thumbs/52b9360cef036b11fd779366602b6e1f.JPG", "https://d3p959fz8jdi04.cloudfront.net/suggestadoc/images/gallery/salons/images/1529/thumbs/52b9360cef036b11fd779366602b6e1f.JPG", "https://d3p959fz8jdi04.cloudfront.net/suggestadoc/images/gallery/salons/images/1529/thumbs/52b9360cef036b11fd779366602b6e1f.JPG"],
  //     'openingHours': "Mon-Sun 11AM - 9PM",
  //     'amenities': ["wifi", "ac"],
  //     'price': "3",
  //     'paymentModes': ["offline", "card"],
  //     'createsAt': new Date(),
  //     'updatedAt': new Date(),
  //     'services': [{
  //       '_id': "Hair Cut Id",
  //       'name': 'Hair Cut'
  //     }, {
  //       '_id': "Facial Id",
  //       'name': 'Facial'
  //     }, {
  //       '_id': "Body Massage Id",
  //       'name': 'Body Massage'
  //     }, {
  //       '_id': "Hair Colouring Id",
  //       'name': 'Hair Colouring'
  //     }]
  //
  //   }, {
  //     'name': 'First-Radiance Ladies Salon, Spa & Academy (Evershine City)',
  //     'serviceId': "null",
  //     'type': 'UNISEX',
  //     'description': 'first-Searches for Facial in Lokhandwala, Mumbai Found363salons and services around you',
  //     'location': {
  //       "_id": "EuijwxaTZP3rxTDdL",
  //       "name": "Ramapuram, Chennai, Tamil Nadu, India"
  //     },
  //     'images': ["https://d3p959fz8jdi04.cloudfront.net/suggestadoc/images/gallery/salons/images/1529/thumbs/52b9360cef036b11fd779366602b6e1f.JPG", "https://d3p959fz8jdi04.cloudfront.net/suggestadoc/images/gallery/salons/images/1529/thumbs/52b9360cef036b11fd779366602b6e1f.JPG", "https://d3p959fz8jdi04.cloudfront.net/suggestadoc/images/gallery/salons/images/1529/thumbs/52b9360cef036b11fd779366602b6e1f.JPG", "https://d3p959fz8jdi04.cloudfront.net/suggestadoc/images/gallery/salons/images/1529/thumbs/52b9360cef036b11fd779366602b6e1f.JPG"],
  //     'openingHours': "Mon-Fri 11AM - 9PM",
  //     'amenities': ["wifi", "ac", "tv"],
  //     'price': "4",
  //     'paymentModes': ["offline"],
  //     'createsAt': new Date(),
  //     'updatedAt': new Date(),
  //     'services': [{
  //       '_id': "Hair Cut Id",
  //       'name': 'Hair Cut'
  //     }, {
  //       '_id': "Facial Id",
  //       'name': 'Facial'
  //     }, {
  //       '_id': "Body Massage Id",
  //       'name': 'Body Massage'
  //     }]
  //   }];
  //
  //   shops.forEach((shop) => {
  //     Shops.insert(shop)
  //   });
  // }
  //
  // // Service Inserted
  // if (ShopServices.find().count() === 0) {
  //   const shopServices = [{
  //     'shopId': 'mvQbhxTXRoo9o2wHJ',
  //     'createdAt': new Date(),
  //     'updatedAt': new Date(),
  //     'Hair Cut': [{
  //       'name': 'HAIR CUT O3+ RANGE OF FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'HAIR CUT FRUIT FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'HAIR CUT SKIN TIGHTENING FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }],
  //     'Facial': [{
  //       'name': 'O3+ RANGE OF FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'FRUIT FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'SKIN TIGHTENING FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }],
  //     'Body Massage': [{
  //       'name': 'BODY MASSAGE O3+ RANGE OF FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'BODY MASSAGE FRUIT FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'BODY MASSAGE SKIN TIGHTENING FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }],
  //     'Hair Colouring': [{
  //       'name': 'Hair Colouring O3+ RANGE OF FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'Hair Colouring FRUIT FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'Hair Colouring SKIN TIGHTENING FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }]
  //   }, {
  //     'shopId': 'LLSZatsySbzCFQyWW',
  //     'createdAt': new Date(),
  //     'updatedAt': new Date(),
  //     'Hair Cut': [{
  //       'name': 'HAIR CUT O3+ RANGE OF FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'HAIR CUT FRUIT FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'HAIR CUT SKIN TIGHTENING FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }],
  //     'Facial': [{
  //       'name': 'O3+ RANGE OF FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'FRUIT FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'SKIN TIGHTENING FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }],
  //     'Body Massage': [{
  //       'name': 'BODY MASSAGE O3+ RANGE OF FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'BODY MASSAGE FRUIT FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'BODY MASSAGE SKIN TIGHTENING FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }],
  //     'Hair Colouring': [{
  //       'name': 'Hair Colouring O3+ RANGE OF FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'Hair Colouring FRUIT FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }, {
  //       'name': 'Hair Colouring SKIN TIGHTENING FACIAL',
  //       'price': '1000',
  //       'discount': '10'
  //     }]
  //   }];
  //
  //   shopServices.forEach((service) => {
  //     ShopServices.insert(service)
  //   });
  // }


})
