import * as React from "react"
import { Text, View } from "react-native"
import ValidatorsListRow from "src/dev/ValidatorsListRow"
import { styles } from "src/dev/ValidatorsListStyles"
import { I18nProps, withNamespaces } from "src/i18n"
import Chevron, { Direction } from "src/icons/chevron"
import Hoverable from "src/shared/Hoverable"
import { colors } from "src/colors"
import {
  Address,
  CeloGroup,
  orderAccessors,
  sortData,
  localStoragePinnedKey,
} from "src/utils/validators"

interface HeaderCellProps {
  style: any[]
  name: string // title of the header cell
  ordered: boolean // is this column determining order of table?
  asc: boolean // is it ordered ascending?
  tooltip?: string // text for the tooltip, no tooltip if left empty
  orderFn: () => void // function executed when header cell is clicked, used to order table
}

class HeaderCell extends React.PureComponent<HeaderCellProps, { hover: boolean }> {
  state = {
    hover: false,
  }

  onHoverIn = () => this.setState({ hover: true })
  onHoverOut = () => this.setState({ hover: false })

  render() {
    const { asc, style, name, ordered, orderFn, tooltip } = this.props
    const { hover } = this.state
    return (
      <Hoverable onHoverIn={this.onHoverIn} onHoverOut={this.onHoverOut} onPress={orderFn}>
        <View style={[styles.tableHeaderCell, style]}>
          <Text style={styles.defaultText}>{name}</Text>
          <Text
            style={[
              styles.defaultText,
              styles.tableHeaderCellArrow,
              ordered && styles.tableHeaderCellArrowVisible,
              ordered && !asc && styles.tableHeaderCellArrowDesc,
            ]}
          >
            <Chevron direction={Direction.up} color={colors.white} size={10} />
          </Text>

          {tooltip && hover && (
            <Text style={[styles.defaultText, styles.tooltip, styles.tooltipHeader]}>
              {tooltip}
            </Text>
          )}
        </View>
      </Hoverable>
    )
  }
}

export interface ValidatorsListProps {
  data: CeloGroup[]
}

type Props = ValidatorsListProps & I18nProps

type orderByTypes =
  | "order"
  | "name"
  | "total"
  | "votes"
  | "rawVotes"
  | "votesAvailables"
  | "celo"
  | "commission"
  | "rewards"
  | "uptime"
  | "attestation"

export interface State {
  expanded: Address | undefined
  orderKey: orderByTypes
  orderAsc: boolean
  pins: Set<string>
}

class ValidatorsList extends React.PureComponent<Props, State> {
  state: State = {
    expanded: undefined,
    orderKey: "order" as orderByTypes,
    orderAsc: true,
    pins: new Set(),
  }
  private orderByFn: { [by: string]: any } = {}

  constructor(...args) {
    super(args[0], args[1])

    Object.keys(orderAccessors).forEach(
      (orderType: any) => (this.orderByFn[orderType] = () => this.orderBy(orderType))
    )
  }

  componentDidMount = () => {
    this.getPinsFromLocaleStorage()
  }

  togglePin = (address: string) => {
    this.setState((state) => {
      if (state.pins.has(address)) {
        state.pins.delete(address)
        const pins = new Set(state.pins)
        return { ...state, pins }
      } else {
        state.pins.add(address)
        const pins = new Set(state.pins)
        return { ...state, pins }
      }
    }, this.storePins)
  }

  getPinsFromLocaleStorage = () => {
    const list = (localStorage.getItem(localStoragePinnedKey) || "").split(",") || []
    this.setState({ pins: new Set(list) })
  }

  storePins = () => {
    const list = Array.from(this.state.pins)
    localStorage.setItem(localStoragePinnedKey, list.join(","))
  }

  expand = (expanded: Address) => {
    if (this.state.expanded === expanded) {
      return this.setState({ expanded: undefined })
    }
    this.setState({ expanded })
  }

  orderBy = async (key: orderByTypes) => {
    const { orderAsc, orderKey } = this.state
    const asc = key === orderKey && orderAsc ? false : true
    this.setState({ orderKey: key, orderAsc: asc, expanded: undefined })
  }

  render() {
    const { expanded, orderAsc, orderKey } = this.state
    const { data } = this.props
    const validatorGroups = sortData(data, orderAsc, orderKey, this.state.pins)
    return (
      <View style={styles.pStatic}>
        <View style={[styles.table, styles.pStatic]}>
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            <View style={[styles.tableHeaderCell, styles.sizeXXS]}>
              <Text style={styles.defaultText}>Pin</Text>
            </View>
            <HeaderCell
              orderFn={this.orderByFn.name}
              style={[styles.tableHeaderCellPadding]}
              name="Name"
              ordered={orderKey === "name"}
              asc={orderAsc}
              tooltip="Name of validator group and validators in it"
            />
            <HeaderCell
              orderFn={this.orderByFn.total}
              style={[styles.sizeM]}
              name="Elected/ Total"
              ordered={orderKey === "total"}
              asc={orderAsc}
              tooltip="Number of validators in the group"
            />
            <HeaderCell
              orderFn={this.orderByFn.votes}
              style={[styles.sizeXL]}
              name="Votes Available"
              ordered={orderKey === "votes"}
              asc={orderAsc}
              tooltip="% of total locked CELO votes received"
            />
            <HeaderCell
              orderFn={this.orderByFn.rawVotes}
              style={[styles.sizeM]}
              name="Votes"
              ordered={orderKey === "rawVotes"}
              asc={orderAsc}
              tooltip="Votes received as a percentage of capacity"
            />
            <HeaderCell
              orderFn={this.orderByFn.votesAvailables}
              style={[styles.sizeM]}
              name="Votes Available"
              ordered={orderKey === "votesAvailables"}
              asc={orderAsc}
              tooltip="Vote capacity as a percentage of total locked CELO"
            />
            <HeaderCell
              orderFn={this.orderByFn.celo}
              style={[styles.sizeM]}
              name="Locked CELO"
              ordered={orderKey === "celo"}
              asc={orderAsc}
            />
            <HeaderCell
              orderFn={this.orderByFn.commission}
              style={[styles.sizeM]}
              name="Group Share"
              ordered={orderKey === "commission"}
              asc={orderAsc}
              tooltip="Amount of CELO locked by group/validator"
            />
            <HeaderCell
              orderFn={this.orderByFn.rewards}
              style={[styles.sizeM]}
              name="Voter Rewards"
              ordered={orderKey === "rewards"}
              asc={orderAsc}
              tooltip="% of max possible rewards received"
            />
            <HeaderCell
              orderFn={this.orderByFn.uptime}
              style={[styles.sizeS]}
              name="Uptime"
              ordered={orderKey === "uptime"}
              asc={orderAsc}
              tooltip="Validator performance score"
            />
            <HeaderCell
              orderFn={this.orderByFn.attestation}
              style={[styles.sizeS]}
              name="Attestation"
              ordered={orderKey === "attestation"}
              asc={orderAsc}
            />
          </View>
          {validatorGroups.map((group) => (
            <ValidatorsListRow
              group={group}
              key={group.id}
              expanded={expanded === group.address}
              onExpand={this.expand}
              onPinned={this.togglePin}
              isPinned={this.state.pins.has(group.address)}
            />
          ))}
        </View>
      </View>
    )
  }
}

export default withNamespaces("dev")(ValidatorsList)
