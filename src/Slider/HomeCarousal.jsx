// import React , {useState} from 'react';
// import {
//   Box,
//   IconButton,
//   useBreakpointValue,
// } from '@chakra-ui/react';

// import Slider from 'react-slick';
// import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

// // Settings for the slider
// const settings = {
//   dots: false,
//   arrows: false,
//   fade: false,
//   infinite: true,
//   autoplay: true,
//   speed: 500,
//   autoplaySpeed: 4000,
//   slidesToShow: 1,
//   slidesToScroll: 1,
// };

// export default function HomeCarousal() {

//   const [slider, setSlider] = useState()

//   const top = useBreakpointValue({ base: '90%', md: '50%' });


  
//   const cards = [
//     {
//       image:
//         'https://jovees.com/pub/media/catalog/category/ayurveda_banner-desktop.jpg',
//     },
//     {
//       image:
//         'https://drsafehands.com/resources/assets/images/medicines/ayurveda_banner.png?i=1',
//     },
//     {
//       image:
//         'https://t4.ftcdn.net/jpg/02/10/73/19/360_F_210731900_wzLm0kMJE4uYgKBtsBzQMtjrbqEcs71f.jpg',
//     },
//     {
//       image:
//         'https://www.swastikayurveda.co.in/wp-content/uploads/2019/01/Swastik-Ayurveda-Banner-01-1241x500.jpg',
//     },
//   ];

//   return (
//     <Box
//       position={'relative'}
//       height={'290px'}
//       width={'full'}
//       overflow={'hidden'}
//       borderRadius="0"
//         zIndex="0">
//       {/* CSS files for react-slick */}
//       <link
//         rel="stylesheet"
//         type="text/css"
//         charSet="UTF-8"
//         href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
//       />
//       <link
//         rel="stylesheet"
//         type="text/css"
//         href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
//       />
//       {/* Left Icon */}
//       <IconButton
//         aria-label="left-arrow"
//         variant="ghost"
//         position="absolute"
//         left={0}
//         top={top}
//         transform={'translate(0%, -50%)'}
//         zIndex={2}
//         color="white"
//         paddingRight="5rem"
//         height="100%"
//         borderRadius="0"
//         bg=" linear-gradient(-90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))"
//         _hover={{bg:" linear-gradient(-90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))"}}
//         _active={{bg:" linear-gradient(-90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))"}}
//         onClick={() => slider?.slickPrev()}>
//         <ChevronLeftIcon fontSize="60px" />
//       </IconButton>
//       {/* Right Icon */}
//       <IconButton
//         aria-label="right-arrow"
//         variant="ghost"
//         position="absolute"
//         borderRadius="0"
//         right={0}
//         top={top}
//         transform={'translate(0%, -50%)'}
//         zIndex={2}
//         color="white"
//         paddingLeft="5rem"
//         height="100%"
//         bg=" linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))"
//         _hover={{bg:" linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))"}}
//         _active={{bg:" linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))"}}
//         onClick={() => slider?.slickNext()}>
//         <ChevronRightIcon fontSize="60px" />
//       </IconButton>
//       {/* Slider */}
//       <Slider {...settings} ref={(slider) => setSlider(slider)}>
//         {cards.map((card, index) => (
//           <Box
//             key={index}
//             height={"300px"}
//             position="relative"
//             backgroundPosition="center"
//             backgroundRepeat="no-repeat"
//             backgroundSize="cover"
//             backgroundImage={`url(${card.image})`}>
//           </Box>
//         ))}
//       </Slider>
//     </Box>
//   );
// }