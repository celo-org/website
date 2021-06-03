import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { flex, flexRow } from 'src/estyles'
import DropDown, { ListItem } from 'src/shared/DropDown'

export interface DropDownProps {
  name: string
  list: ListItem[]
  onSelect: (key: string) => void
  onClear: () => void
}

interface Props {
  data: DropDownProps[]
  direction?: "horizontal"| "vertical"
  darkMode?: boolean
}

interface State {
  openIndex: number | null
}

export default class DropDownGroup extends React.Component<Props, State> {
  state = { openIndex: null }

  setOpenDropDown = (openIndex: number | null) => {
    this.setState({ openIndex })
  }

  closeAll = () => {
    this.setState({ openIndex: null })
  }

  render = () => {
    return (
      <>
        <div css={this.props.direction  === 'horizontal'? flexRow : flex} >
          {this.props.data.map((dropDownProps, index) => {
            return (
              <DropDown
                list={dropDownProps.list}
                name={dropDownProps.name}
                key={dropDownProps.name}
                onClear={dropDownProps.onClear}
                onSelect={dropDownProps.onSelect}
                isOpen={index === this.state.openIndex}
                index={index}
                toggleOpen={this.setOpenDropDown}
                darkMode={this.props.darkMode}
              />
            )
          })}
        </div>
        {this.state.openIndex !== null && <View style={styles.overlay} onClick={this.closeAll} />}
      </>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "transparent",
    opacity: 0,
    zIndex: -3,
  },
})
