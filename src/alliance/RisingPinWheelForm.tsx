import * as React from "react"
import { StyleSheet, View } from "react-native-web"
import CollectiveMission from "src/alliance/CollectiveMission"
import PinWheel from "src/alliance/PinWheel"
import HubspotForm from "src/contentful/grid2-cells/HubspotForm"
import { Cell, GridRow, Spans } from "src/layout/GridRow"
import { standardStyles } from "src/styles"

export default function RisingPinWheelForm() {
  return (
    <View style={standardStyles.darkBackground}>
      <GridRow
        desktopStyle={standardStyles.sectionMarginTop}
        tabletStyle={standardStyles.sectionMarginTopTablet}
        mobileStyle={standardStyles.sectionMarginTopMobile}
        allStyle={[standardStyles.centered, standardStyles.blockMarginBottom]}
      >
        <Cell span={Spans.half}>
          <CollectiveMission />
          <HubspotForm hubspotFormId="5fa6fcf5-ad5b-40e0-8b61-76f0c5e6f93b" darkMode={true} />
        </Cell>
      </GridRow>
      <View style={styles.pinWheelContainer}>
        <PinWheel mobileContainerStyle={styles.innerPinWheelContainer} static={true} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pinWheelContainer: {
    width: "100%",
    height: "50vw",
    maxHeight: "50vh",
    overflow: "hidden",
    alignItems: "center",
  },
  innerPinWheelContainer: {
    width: "100%",
    height: "80vh",
    maxHeight: "100vw",
    maxWidth: "90vw",
  },
})
