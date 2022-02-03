export default interface AssetProps {
  name: string
  description: string
  tags: string[]
  id: string
  preview: string
  uri: string
  series?: string
  width?: number
  height?: number
}
