export default function getRightHeightImg(name: string) {
  if (name.startsWith("Striving")) {
    return 198
  } else if (name.startsWith("Embodying")) {
    return 236
  } else if (name.startsWith("Innovation")) {
    return 288
  } else if (name.startsWith("Design")) {
    return 308
  } else if (name.startsWith("Build")) {
    return 320
  } else if (name.startsWith("Inclusive") && name.startsWith("Mobile")) {
    return 330
  } else if (name.startsWith("Operating")) {
    return 232
  } else if (name.startsWith("Community")) {
    return 382
  } else if (name.startsWith("Roll")) {
    return 164
  } else if (name.startsWith("Coins")) {
    return 222
  } else if (name.startsWith("Finding")) {
    return 164
  } else if (name.startsWith("Evolving")) {
    return 180
  } else if (name.startsWith("Unique")) {
    return 246
  } else {
    return 400
  }
}
