import { Dimensions } from "react-native";

export const responsiveSize = (size: number) => {
    const {width, height} = Dimensions.get('window');
  
    const baseWidth = 375;
    const baseHeight = 812;
    const basePixelRatio = 2;
  
    const responsiveWidth = (size * width) / baseWidth;
    const responsiveHeight = (size * height) / baseHeight;
    const responsiveSize =
      (responsiveWidth + responsiveHeight) / 2 / basePixelRatio;
  
    return responsiveSize;
  };