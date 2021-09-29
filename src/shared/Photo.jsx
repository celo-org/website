import * as React from "react";
import LazyLoadFadin from "react-lazyload-fadein";
import { Image, StyleSheet, View } from "react-native";
import AspectRatio from "src/shared/AspectRatio";
import { standardStyles } from "src/styles";
export default React.memo(function Photo({ ratio, image, preview }) {
    return (<View>
      <AspectRatio ratio={ratio}>
        <Image source={preview} style={styles.imagePreview}/>
      </AspectRatio>
      <View style={styles.realImageContainer}>
        <LazyLoadFadin>
          {(onLoad) => (<AspectRatio ratio={ratio}>
              <Image onLoadEnd={onLoad} source={image} style={standardStyles.image}/>
            </AspectRatio>)}
        </LazyLoadFadin>
      </View>
    </View>);
});
const styles = StyleSheet.create({
    imagePreview: {
        opacity: 0.5,
        filter: `blur(20px)`,
        height: "100%",
        width: "100%",
    },
    realImageContainer: { position: "absolute", height: "100%", width: "100%" },
});
//# sourceMappingURL=Photo.jsx.map